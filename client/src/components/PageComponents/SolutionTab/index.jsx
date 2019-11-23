import React, { Component } from 'react';
import PropTypes from 'prop-types';
import State from './state.jsx';
import { withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
    showCancelBtn: PropTypes.instanceOf(Boolean) || false,
    showSaveBtn: PropTypes.instanceOf(Boolean) || false,
    onSave: PropTypes.instanceOf(Function) || function () { }
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label,
      showPreviousBtn: false,
      showNextBtn: true,
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab }, () => {
      let currIndex = 0;

      for (let iter = 0; iter < this.props.children.length; iter++) {
        if (this.props.children[iter].props.label === this.state.activeTab) {
          currIndex = iter;
        }
      }
  
      if (currIndex > 0) {
        this.setState({ showPreviousBtn: true });
      } else {
        this.setState({ showPreviousBtn: false });
      }
  
      if (currIndex < this.props.children.length - 1) {
        this.setState({ showNextBtn: true });
      } else {
        this.setState({ showNextBtn: false });
      }
    });
  }

  onClickCancel = (btn) => {
    this.props.history.push('/browse');
  }

  render() {
    const {
      onClickTabItem,
      onClickCancel,
      props: {
        children,
      },
      state: {
        activeTab,
      }
    } = this;

    return (
      <div className="tabs">
        <ol className="tab-list">
          {children.map((child) => {
            const { label } = child.props;
            return (
              <State
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
        <br/> <br/> <br/>
        <div>
        { this.props.showCancelBtn ? <button type="button" class="btn btn-light" onClick={this.onClickCancel}>Cancel</button> : null }
          { this.props.showSaveBtn ? <button type="button" class="btn btn-light" onClick={this.props.onSave}>Save</button> : null }
        </div>
        
      </div>
    );
  }
}

export default withRouter(Tabs);