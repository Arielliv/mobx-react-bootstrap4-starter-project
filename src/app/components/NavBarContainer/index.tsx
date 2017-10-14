import * as React from 'react';
import * as classNames from 'classnames';
import { LogFilter, LOG_FILTER_TITLES, LOG_FILTER_TYPES } from '../../constants/appRouts';
import { Nav, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import NavItem from "reactstrap/lib/NavItem";
import NavLink from "reactstrap/lib/NavLink";
import * as style from './style.css';

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

  renderLogsCount() {
    const { logsCount } = this.props;
    const itemWord = logsCount === 1 ? 'פריט' : 'פריטים';

    return (
      <span className={style.count}>
        <strong>{logsCount || 'אין'}</strong> {itemWord}
      </span>
    );
  }

  renderFilterLink(filter: LogFilter) {
    const title = LOG_FILTER_TITLES[filter];
    const { filter: selectedFilter, onChangeFilter } = this.props;
    const className = classNames({
      [style.selected]: filter === selectedFilter
    });

    return (
      <NavLink
        style={{ cursor: 'pointer' }}
        onClick={() => onChangeFilter(filter)}>
        {title}
      </NavLink>
    );
  }


  render() {
      const style1 = style.normal + "pb-5";
    return (
        <div className="">
          <Nav className={style.normal}>
            <div className=" col-12 justify-content-between">
                <div className="col-9 d-inline-block">
                    {LOG_FILTER_TYPES.map((filter) =>
                        <NavItem className="d-inline-block  " key={filter} children={this.renderFilterLink(filter)}/>
                    )}
                </div>
                <div className="col-3 d-inline-block text-left">
                    {this.renderLogsCount()}
                </div>
            </div>
          </Nav>
        </div>
    );
  }
}

export default NavBarContainer;
