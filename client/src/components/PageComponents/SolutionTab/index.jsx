import React, { Component } from 'react';
import PropTypes from 'prop-types';
import State from './state.jsx';

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

  onClickPrevBtn = (btn) => {
    let currIndex = 0;

    for (let iter = 0; iter < this.props.children.length; iter++) {
      if (this.props.children[iter].props.label === this.state.activeTab) {
        currIndex = iter;
      }
    }

    let prevIndex = currIndex - 1

    if (prevIndex === 0) {
      this.setState({ showPreviousBtn: false });
    }

    if (prevIndex < this.props.children.length) {
      this.setState({ showNextBtn: true });
    }

    this.setState({ activeTab: this.props.children[prevIndex].props.label })
  }

  onClickNextBtn = (btn) => {
    let currIndex = 0;

    for (let iter = 0; iter < this.props.children.length; iter++) {
      if (this.props.children[iter].props.label === this.state.activeTab) {
        currIndex = iter;
      }
    }

    let nextIndex = currIndex + 1

    if (nextIndex !== 0) {
      this.setState({ showPreviousBtn: true })
    }

    if (nextIndex+1 >= this.props.children.length) {
      this.setState({ showNextBtn: false })
    }

    this.setState({ activeTab: this.props.children[nextIndex].props.label })
  }

  render() {
    const {
      onClickTabItem,
      onClickPrevBtn,
      onClickNextBtn,
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
          { this.state.showPreviousBtn ? <button type="button" onClick={onClickPrevBtn}>Previous</button> : null }
          { this.state.showNextBtn ? <button type="button" onClick={onClickNextBtn}>Next</button> : null }

        </div> <br />
        <div>
        { this.props.showSaveBtn ? <button type="button">Cancel</button> : null }
          { this.props.showSaveBtn ? <button type="button" onClick={this.props.onSave}>Save</button> : null }
        </div>
        
      </div>
    );
  }
}

export default Tabs;