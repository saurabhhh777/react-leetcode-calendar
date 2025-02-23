# React LeetCode Calendar 📅

[![npm version](https://img.shields.io/npm/v/react-leetcode-calendar.svg)](https://www.npmjs.com/package/react-leetcode-calendar)
[![GitHub stars](https://img.shields.io/github/stars/saurabhhh777/react-leetcode-calendar)](https://github.com/saurabhhh777/react-leetcode-calendar/stargazers)
[![License](https://img.shields.io/github/license/saurabhhh777/react-leetcode-calendar)](LICENSE)

Easily display a **LeetCode submission calendar** in your React projects! 🚀  
This library provides a **GitHub-like activity graph** for LeetCode submissions.  
Supports fetching and displaying **daily coding activity** with an **auto-provided QueryClient** (no extra setup required).

---

## 🌟 Features
✅ **Auto-fetches LeetCode submission history**  
✅ **Displays a visual calendar of coding activity**  
✅ **Supports yearly and full-history views**  
✅ **Zero configuration required for React Query**  
✅ **Lightweight & Easy to Use**  

---

## 📦 Installation

Install the package using npm or yarn:

```
npm install react-leetcode-calendar

or 

yarn add react-leetcode-calendar
```

## 🚀 Usage
Simply import and use the component:


```
import { Leetcodecalendar } from "react-leetcode-calendar";

const App = () => {
  return (
      <Leetcodecalendar username={"saurabhhh777"} graph={"yearly"} />
  );
};

export default App;
```


## 🎯 Props
<table>
    <thead>
        <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>username</td>
            <td>string</td>
            <td>Required</td>
            <td>LeetCode username for fetching submissions</td>
        </tr>
        <tr>
            <td>graph</td>
            <td>string</td>
            <td>"default"</td>
            <td>"yearly" for last year's data, or omit to show full history</td>
        </tr>
    </tbody>
</table>


## 📊 How It Works?

- When graph="yearly" → The last 1 year of data from the current date will be displayed.
- When no graph prop is provided → It will automatically detect the first & last submission dates and display only that range.

## 🔗 Links

- [Github Repo](https://github.com/saurabhhh777/react-leetcode-calendar.git)
- [NPM Package:](https://www.npmjs.com/package/react-leetcode-calendar)


## 📜 License
This project is licensed under the [MIT License](https://img.shields.io/github/license/saurabhhh777/react-leetcode-calendar).