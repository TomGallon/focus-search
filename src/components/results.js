import React, {PropTypes} from 'react';
import ToolBar from './toolbar';
import connectToSelectableList from './selectable-list';
import InputCheckbox from 'focus-components/input-checkbox';

export function MaterialListWrapper ({children}) {
    return (<ul data-focus='list-component' className='mdl-list'>{children}</ul>)
};

//TODO Ephrame : replace idx
export function FocusAction({actions, ActionsComponent, ...otherProps}){
    return (
        <div data-focus='focus-actions'>
            {actions ? actions.map((action, idx) => <button key={idx} onClick={action.action}>{action.label}</button>) : <ActionsComponent {...otherProps}/>}
        </div>
    );
}

export function MaterialLineWrapper({children, actionsLine, ActionsComponent, ...props}) {
    return (
        <li data-focus='line-component' className='mdl-list__item'>
            {props.toggleLineSelection &&
                <div data-focus='line-component-selection'>
                    <InputCheckbox value={props.isSelected} onChange={() => props.toggleLineSelection(props.id)} />
                </div>
            }
            {children}
            {(actionsLine || ActionsComponent) && <div data-focus='line-component-actions'><FocusAction actions={actionsLine} ActionsComponent={ActionsComponent} {...props}/></div>}
        </li>
    );
};

export function ListComponent({toggleLineSelection, toggleAllLine, LineComponent, lineIdentifierProperty, data,  ListWrapper,actionsLine,LineWrapper,toolbarProps, selectState}){
    //to do check the values
    return (
      <div>
          <ToolBar data-focus='toolbar-advanced-search'
              toolbarProps={toolbarProps}
              toggleAllLine={toggleAllLine}
              selectState={selectState}
              />
          <ListWrapper>
            //TODO find in fields the id =) for the key map !
              {data && data.map(({isSeleted, ...lineDescriptor}, idx) => (
                  <div data-focus='line-advanced-search' key={idx}>
                      <LineWrapper isSelected={isSeleted} toggleLineSelection={toggleLineSelection}  actionsLine={actionsLine} {...lineDescriptor}>
                          <LineComponent{...lineDescriptor} />
                      </LineWrapper>
                  </div>
              ))}
          </ListWrapper>
      </div>
    )
};
ListComponent.displayName ='ListcomponentWithSelection';
ListComponent.propTypes = {
    toggleLineSelection: PropTypes.func,
    LineComponent: PropTypes.func.isRequired,
    lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    data: PropTypes.array.isRequired,
    ListWrapper: PropTypes.func.isRequired,
    LineWrapper: PropTypes.func
};
ListComponent.defaultProps = {
    lineIdentifierProperty: 'id',
    ListWrapper: MaterialListWrapper,
    LineWrapper: MaterialLineWrapper
};


/*
<Provider Lines>

const connectToLineComponent =  Component => ({listType, ...otherProps}) => {
const LineComponent = _getLineComponentFromContext(listType);
return <Component {...otherProps} LineComponent={LineComponent}/>;
}
*/

export function ResultList({data, lineIdentifierProperty, actionsLine, LineComponent, ListComponent, toolbarProps}) {
    return(
        <div data-focus='result-list'>
            {/**Toolbar needs the toggleAllLine :-1 */}
            <ListComponent data-focus='selectable-list-advanced-search'
                LineComponent={LineComponent}
                data={data}
                actionsLine={actionsLine}
                toolbarProps={toolbarProps}/>
        </div>
    );
};
ResultList.defaultProps = {
    data: [],
    lineIdentifierProperty: 'id',
    isSelectable: false,
    toolbarProps: {},
    ListComponent: ListComponent
};
ResultList.propTypes = {
    data: PropTypes.array,
    toolbarProps: PropTypes.object.isRequired,
    lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isSelectable: PropTypes.bool,
    /* This function is use to get the line component depending */
    ListComponent: PropTypes.func
};


export function ResultGroup({data, sort, group, isGroup, toolbarProps, actionsLine}) {
  console.log('ResultGroup', data)

    return (
      <div data-focus='result-group' >
          {data.map((element, idx) => {
              //TO do add ListWrapper
              return (
                <ResultList data={element.values}
                      toolbarProps={toolbarProps}
                      key={idx}
                      actionsLine={actionsLine}
                      LineComponent={element.LineComponent}
                      />
              );
          })}
      </div>
    )
};
ResultGroup.displayName = 'Result Group'
ResultGroup.propTypes = {
    data: PropTypes.array.isRequired,
    toolbarProps: PropTypes.object.isRequired
};
ResultGroup.defaultProps = {
    data: [],
    toolbarProps: {}
};
