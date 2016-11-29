import React, {Component, PureComponent, PropTypes} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import isArray from 'lodash/isArray';
import reduce from 'lodash/reduce';
import concat from 'lodash/concat';
import i18next from 'i18next';

import {selectSearch} from '../reducer';
import Button from 'focus-components/button';
import Dropdown from 'focus-components/dropdown';


function _buildSortAction(item, order, sortAction) {
    return {
        label: `${item} ${order}`,
        action: () => sortAction({name: item, order: order})
    };
};

function _buildGroupAction(item, groupAction) {
    const groupCreate = item === "ungroup" ? {} : {name: item}
    return {
        label: `${item}`,
        action: () => groupAction(groupCreate)
    };
};

function _checkProps(sortList, groupList){
    if(!isArray(sortList) || sortList.length < 1) {
        throw new Error("You must provide a array for the groupList not empty in the SearchProvider")
    }
    if(!isArray(groupList) || groupList.length < 1) {
        throw new Error("You must provide a array fort the sortList in not empty in the SearchProvider")
    }
};

export function ToolbarSort({sortList, sortAction}) {
    const operationList = reduce(sortList, (result, item) => concat(result, _buildSortAction(item, 'asc', sortAction), _buildSortAction(item, 'desc', sortAction)), []);
    const buttonProps = {icon: undefined, label: i18next.t('focus.search.sort'), shape: null};
    return <Dropdown data-focus='toolbar-sort' operations={operationList} button={buttonProps} />
};
ToolbarSort.displayName = 'ToolbarSort';
ToolbarSort.propTypes = {
    sortAction: PropTypes.func.isRequired,
    sortList : PropTypes.array
};



export function ToolbarGroup({groupList, groupAction, unGroup}) {
    const label = i18next.t(unGroup ? 'focus.search.ungroup': 'focus.search.group');
    const operationList = reduce(groupList, (result, item) => concat(result, _buildGroupAction(item, groupAction)), []);
    const buttonProps = {icon: undefined, label: label, shape: null};
    return (unGroup ? <button onClick={operationList[0].action}>{i18next.t('focus.search.ungroup')}</button> : <Dropdown data-focus='toolbar-group' operations={operationList} button={buttonProps} />);
};
ToolbarGroup.displayName = 'ToolbarGroup';
ToolbarGroup.propTypes = {
    groupAction: PropTypes.func.isRequired,
    groupList : PropTypes.array
};

const ToolbarSelection = ({selectState, toggleAllLine, label, totalCount}) => {
    //<i class="material-icons">indeterminate_check_box</i>
    return (
        <span>
            {selectState && <Button onClick={toggleAllLine} icon='check_box' shape='icon' />}
            {!selectState && <Button onClick={toggleAllLine} icon='check_box_outline_blank' shape='icon' /> }
            <span>{label}</span>
            {totalCount && <span> ({totalCount})</span>}
        </span>
    );
};
ToolbarSelection.displayName = 'ToolbarSelection';
ToolbarSelection.propTypes = {
    selectState: PropTypes.bool,
    toggleAllLine: PropTypes.func
};


export const ToolBar = ({
    GlobalActions,
    GlobalGroupActionsComponent,
    groupAction,
    groupList=[],
    groupSelect,
    isGroup,
    label,
    numberOfSelectedElement,
    scope,
    selectedElements,
    sortAction,
    sortList,
    stateOfTheSelectionList,
    toggleAllLine,
    totalCount,
    unGroup
}) => {
    // const toolBarGroup = groupList.reduce((array, item)=> {
    //   if(groupSelect &&  groupSelect.name !== item.code) array.push(item);
    //   else array.push({code: 'ungroup', label:'ungroup'})
    //   return array;
    // }, [])
    //console.log('-->', GlobalGroupActionsComponent, groupSelect, stateOfTheSelectionList);
    return (
        <div data-focus='toolbar' className='mdl-grid mdl-shadow--3dp'>
            {toggleAllLine && <ToolbarSelection label={label} totalCount={totalCount} selectState={stateOfTheSelectionList} toggleAllLine={toggleAllLine} />}
            {(numberOfSelectedElement > 0) && <div data-focus='toolbar-selected-elements'>{i18next.t('focus.search.selected', {count: numberOfSelectedElement})}</div>}
            {!isGroup && sortList && <ToolbarSort sortAction={sortAction} sortList={sortList} />}
            {!isGroup && groupList && <ToolbarGroup unGroup={unGroup} groupAction={groupAction} groupList={groupList} />}
            {GlobalActions && stateOfTheSelectionList && <div data-focus='toolbar-global-actions'><GlobalActions selectedElements={selectedElements} /></div>}
            {GlobalGroupActionsComponent && stateOfTheSelectionList && <div data-focus='toolbar-group-actions'><GlobalGroupActionsComponent selectedElements={selectedElements} /></div>}
        </div>
    );
};
ToolBar.displayName = 'ToolBar';
ToolBar.defaultProps = {
    sortAction: () => console.warn('please define a sort function...'),
    groupAction: () => console.warn('please define a group function...'),
    sortList: [],
    groupList: [],
    selectState: false,
    toggleAllLine: undefined
};
ToolBar.propTypes = {
    sortAction: PropTypes.func.isRequired,
    groupAction: PropTypes.func.isRequired,
    sortList: PropTypes.array,
    groupList: PropTypes.array,
    selectState: PropTypes.bool,
    toggleAllLine: PropTypes.func
};
