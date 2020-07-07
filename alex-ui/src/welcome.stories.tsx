import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome', module)
  .add('Welcome', () => {
    return (
      <>
        <h1>欢迎来到 alex-ui 组件库</h1>
        <p> alex-ui组件库是由 React + TypeScript 打造的</p>
        <h3>安装试试</h3>
        <code>
          npm install alexui --save
        </code>
      </>
    )
  }, { info : { disable: true }})