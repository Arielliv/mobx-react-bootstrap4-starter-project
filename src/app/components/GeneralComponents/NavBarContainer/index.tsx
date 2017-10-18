import * as React from 'react';
import * as classNames from 'classnames';
import {
    LogFilter, LOG_FILTER_TITLES, LOG_FILTER_TYPES, LOG_FILTER_COMPONENT_HASH,
    LOG_FILTER_LOCATION_HASH
} from '../../../constants/appRouts';
import { Nav, FormGroup, Label, Input, FormText } from 'reactstrap';
import NavItem from "reactstrap/lib/NavItem";
import NavLink from "reactstrap/lib/NavLink";
import * as style from './style.css';
import {Route, Router, Switch} from "react-router";
import LogsCount from "../LogsCount/index";

export interface NavBarContainerProps {
  filter: LogFilter;
  logsCount: number;
  onChangeFilter: (filter: LogFilter) => any;
};

export interface NavBarContainerState {
  /* empty */
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

      const style1 = style.normal + "pb-5";
      const routs = (LOG_FILTER_TYPES.map((filter) =>
          <Route path={"/"+LOG_FILTER_LOCATION_HASH[filter]} component={LOG_FILTER_COMPONENT_HASH[filter]} key={filter}/>
      ));
    return (
        <div className="">
          <Nav className={style.normal}>
            <div className=" col-12 justify-content-between">
                <div className="col-9 d-inline-block">
                    {LOG_FILTER_TYPES.map((filter) =>
                        <NavItem className="d-inline-block " key={filter} children={this.renderFilterLink(filter)}/>
                    )}
                </div>
                <LogsCount/>
            </div>
          </Nav>
            {routs}

        </div>
    );
  }
}

export default NavBarContainer;
