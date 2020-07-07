import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome', module)
  .add('Welcome', () => {
    return (
      <>
        <h1>欢迎来到 alex-design 组件库</h1>
        <p> alex-design组件库是由 React + TypeScript 打造的</p>
        <h3>安装试试</h3>
        <code>
          npm install alex-design --save
        </code>
      </>
    )
  }, { info : { disable: true }})