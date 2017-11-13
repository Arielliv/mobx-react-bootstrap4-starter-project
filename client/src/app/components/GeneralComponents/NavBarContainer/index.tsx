import * as React from 'react';
import * as classNames from 'classnames';
import {LogFilter, LOG_FILTER_TITLES, LOG_FILTER_TYPES, LOG_FILTER_COMPONENT_HASH, LOG_FILTER_LOCATION_HASH} from '../../../constants/appRouts';
import { Navbar ,Nav, NavItem ,NavLink} from 'reactstrap';
import * as style from './style.css';
import {Route} from "react-router";
import LogsCount from "../LogsCount/index";

export interface NavBarContainerState {
  /* empty */
}

export interface NavBarContainerProps {
    filter: LogFilter;
    onChangeFilter: (filter: LogFilter) => any;
}

export class NavBarContainer extends React.Component<NavBarContainerProps, NavBarContainerState> {

  constructor(props, context?: any) {
      super(props, context);
      this.state = {};

  }

  renderFilterLink(filter: LogFilter) {
      const title = LOG_FILTER_TITLES[filter];
      const {filter: selectedFilter, onChangeFilter} = this.props;
      const className = classNames({
          [style.selected]: filter === selectedFilter
      });

      return (
          <NavLink
              style={{cursor: 'pointer'}}
              onClick={() => onChangeFilter(filter)}>
              {title}
          </NavLink>
      );
  }


  render() {

      const style1 = style.normal + " navbar-dark bg-dark";
      const routs = (LOG_FILTER_TYPES.map((filter) =>
          <Route path={"/"+LOG_FILTER_LOCATION_HASH[filter]} component={LOG_FILTER_COMPONENT_HASH[filter]} key={filter}/>
      ));
    return (
        <div className="">
          <Navbar  className={style1}>
            <div className=" col-12 justify-content-between  ">
                <div className="col-9 d-inline-block">
                    {LOG_FILTER_TYPES.map((filter) =>
                        <NavItem className="d-inline-block " key={filter} children={this.renderFilterLink(filter)}/>
                    )}
                </div>
                <LogsCount/>
            </div>
          </Navbar >
            {routs}
        </div>
    );
  }
}

export default NavBarContainer;
