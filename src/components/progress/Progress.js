import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'astro-classname';


import './index.scss';

export default class Progress extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    type: PropTypes.oneOf(['line', 'circle']),
    status: PropTypes.oneOf(['active', 'exception']),
    precent: PropTypes.number
  }

  static defaultProps = {
    className: '',
    prefix: 'zhui-progress',
    type: 'line',
    status: 'active',
    precent: 0,
  }

  render() {
    const {
      className,
      prefix,
      type,
      precent,
      status,
      ...others
    } = this.props;

    const classes = cn(className, `${prefix}-wrapper`, {
      [`${prefix}-${type}`]: type,
    });
    const innerClass = cn(`${prefix}-inner`, {
      [`${prefix}-active`]: precent < 100 && precent > 5 && status !== 'exception',
      [`${prefix}-exception`]: status === 'exception',
      [`${prefix}-success`]: precent >= 100,
    });
    const width = precent + '%';
    const rest = 100 - precent + '%';
    const top = -precent * (120 / 100) - 1;

    return type !== 'circle' ?
      (
        <div className={classes} {...others}>
          <div className={innerClass}>
            <div className={`${prefix}-bg`} style={{ width: width }}>
            </div>
            <div className={`${prefix}-rest`} style={{ width: rest }}></div>
          </div>
        </div>
      ) :
      (
        <div
          className={cn(classes, {
            [`${prefix}-circle-success`]: precent >= 100,
          })}
          {...others}
        >
          <span className={`${prefix}-waveBefore`} style={{ top: top }}></span>
          <span className={`${prefix}-waveAfter`} style={{ top: top }}></span>
        </div>
      );
  }
}