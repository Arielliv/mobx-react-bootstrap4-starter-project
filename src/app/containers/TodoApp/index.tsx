import * as React from 'react';
import * as style from './style.css';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { Body } from '../../components/Body';
// import { TodoList } from '../../components/TodoList';
// import { Footer } from '../../components/Footer';
// import { TodoModel } from '../../models/LogModel';
// import { TodoStore, RouterStore } from '../../stores';



export interface TodoAppProps extends RouteComponentProps<any> {
  /** MobX Stores will be injected via @inject() **/
  // [STORE_ROUTER]: RouterStore;
  // [STOURE_TODO]: TodoStore;
}

// export interface TodoAppState {
//   filter: TodoFilter;
// }

// @inject(STORE_TODO, STORE_ROUTER)
@observer
export class TodoApp extends React.Component<TodoAppProps> {

  constructor(props: TodoAppProps, context: any) {
    super(props, context);
    this.state = {  };
  }

  // componentWillMount() {
  //   this.checkLocationChange();
  // }
  //
  // componentWillReceiveProps(nextProps: TodoAppProps, nextContext: any) {
  //   this.checkLocationChange();
  // }
  //
  // checkLocationChange() {
  //   const router = this.props[STORE_ROUTER] as RouterStore;
  //   const filter = Object.keys(TODO_FILTER_LOCATION_HASH)
  //     .map((key) => Number(key) as TodoFilter)
  //     .find((filter) => TODO_FILTER_LOCATION_HASH[filter] === router.location.hash);
  //   this.setState({ filter });
  // }
  //
  // handleFilter(filter: TodoFilter) {
  //   const router = this.props[STORE_ROUTER] as RouterStore;
  //   const currentHash = router.location.hash;
  //   const nextHash = TODO_FILTER_LOCATION_HASH[filter];
  //   if (currentHash !== nextHash) {
  //     router.replace(nextHash);
  //   }
  // }
  //
  // getFilteredTodo(filter: TodoFilter) {
  //   const todoStore = this.props[STORE_TODO] as TodoStore;
  //   switch (filter) {
  //     case TodoFilter.ACTIVE: return todoStore.activeTodos;
  //     case TodoFilter.COMPLETED: return todoStore.completedTodos;
  //     default: return todoStore.todos;
  //   }
  // }

  render() {

    return (
      <div >
        <Body  />
      </div>
    );
  }
}
