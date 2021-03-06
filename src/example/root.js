import React, {Component, PropTypes} from 'react';
import {IndexRoute, Router, Route} from 'react-router';
import Home from './views/home';
import App from './app'
import {Provider as StoreProvider} from 'react-redux';
import 'babel-polyfill';
import {Provider as SearchProvider} from '../behaviours/search';

/* Components */
const _getListMetadata = (listType, listData) => {
    switch (listType) {
        case 'DonDiegoType':
        return {
            LineComponent: props => {
                const color = props.isSelected ? 'orange' : 'blue'
                return (
                    <div>
                        <div>Line DonDiegoType {JSON.stringify(props)}</div>
                    </div>)
                },
                actionsLine: [
                  {label: 'Yo', icon: 'print', action: () => {console.log('action')}},
                  {label: 'La', icon: 'print', action: () => {console.log('action')}}

                ],
                sortList : [
                    'ouuuuaaa',
                    'trrropo',
                    'lalal'
                ],
                groupList: [
                    'lala',
                    'lulu',
                    'lolo'
                ]
            }
            break;
            case 'DonRicardoType':
            return {
                LineComponent: props => <div>Line DonRicardoType {JSON.stringify(props)}</div>,
                sortList : [
                    'lala',
                    'lolo',
                    'lulu'
                ],

                groupList: [
                    'lala',
                    'lulu'
                ]
            }
            break;
            default:
            return {
                LineComponent: props => <div>Bien le bonsoir</div>,
                sortList : [
                    'ouuuuaaa',
                    'trrropo',
                    'lalal'
                ],
                groupList: [
                    {code: 'FCT_MOVIE_TYPE', label: 'Movie Type'},
                    {code: 'FCT_MOVIE_Truc', label: 'Movie Truc'},
                    {code: 'FCT_MOVIE_Machin', label: 'Movie Machin'}
                ]
            }

        }
    }
    const Root = ({store, history}) => /*On place le provider de store au plus haut afin de pouvoir injecter des informations du store dans toute l'applciation.*/
       <StoreProvider store={store}>
       <SearchProvider store={store} searchMetadata={{getListMetadata : _getListMetadata,
               scopes:[{value: 'all', label:'all', selected:false}, {value: 'scope', label: 'Scope 01', selected:true}, {value: 'scope2', label:'Scope 02', selected:false}],
               scopeEntityDefintion : {
                 DonDiegoType : {
                   firstName: {
                     formator : props => props + 'YO'
                   }
                 }
               }
             }}>
           <Router history={history}>
             <Route path='/' component={App} >
              <IndexRoute component={Home}/>
            </Route>
           </Router>
         </SearchProvider>
       </StoreProvider>;

    class RootHotLoader extends Component { /*On place le provider de store au plus haut afin de pouvoir injecter des informations du store dans toute l'applciation.*/
        render() {
            const {store, history} = this.props;
            return (
                <StoreProvider store={store}>
                    <SearchProvider store={store} searchMetadata={{getListMetadata : _getListMetadata,
                            scopes:[{value: 'scope', label: 'Scope 01', selected:true}, {value: 'scope2', label:'Scope 02', selected:false}, {value: 'all', label:'all', selected:false}]

                          }}>
                        <Router history={history}>
                            <Route path='/' component={App} >
                                <IndexRoute component={Home}/>
                            </Route>
                        </Router>
                    </SearchProvider>
                </StoreProvider>
            );
        }
    }

    Root.propTypes = {
        history: PropTypes.object.isRequired
    };

    export default Root;
