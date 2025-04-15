# 广告投放平台

这是一个面向客户的互联网广告投放平台，提供广告购买、账户充值、发票管理等功能。

## 功能特点

- 广告购买和管理
  - 支持多种广告类型（横幅、信息流、开屏、视频）
  - 广告审核流程
  - 实时数据统计

- 账户管理
  - 账户充值
  - 充值记录查询
  - 发票申请和管理

## 本地开发

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm start
```

3. 访问网站
打开浏览器访问 http://localhost:3000

## 项目结构

```
ad-platform-frontend/
├── src/
│   ├── pages/          # 页面组件
│   │   ├── Home.tsx           # 首页
│   │   ├── AdManagement.tsx   # 广告管理
│   │   ├── Recharge.tsx       # 充值
│   │   ├── RechargeHistory.tsx# 充值记录
│   │   └── Invoice.tsx        # 发票管理
│   ├── components/    # 公共组件
│   ├── utils/        # 工具函数
│   └── App.tsx       # 应用入口
└── public/           # 静态资源
```

## 开发记录

### 2024-03-xx
- 创建项目基础结构
- 实现广告购买功能
- 添加充值和发票管理

## 待办事项

- [ ] 实现用户注册和登录
- [ ] 添加支付接口对接
- [ ] 完善广告效果统计
- [ ] 添加在线客服功能

## 注意事项

1. 代码提交前请确保：
   - 所有功能正常运行
   - 没有编译错误
   - 代码格式规范

2. 本地开发注意事项：
   - 保持 node_modules 依赖更新
   - 遵循 TypeScript 类型规范
   - 使用统一的代码风格

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
