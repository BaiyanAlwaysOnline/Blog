import React from "react";
import { storiesOf } from "@storybook/react";
import AutoComplete, { DataSourceType } from "../AutoComplete/autoComplete";
import { action } from "@storybook/addon-actions";

interface DataType {
  value: string;
  number?: number;
}
interface GithubDataType {
  value: string;
  url?: string;
  id?: number;
}

storiesOf("AutoComplete 自动补全", module)
  .add("支持自定义下拉模板", () => {
    const lakersWithNumber = [
      { value: "bradley", number: 11 },
      { value: "pope", number: 1 },
      { value: "caruso", number: 4 },
      { value: "cook", number: 2 },
      { value: "cousins", number: 15 },
      { value: "james", number: 23 },
      { value: "AD", number: 3 },
      { value: "green", number: 14 },
      { value: "howard", number: 39 },
      { value: "kuzma", number: 0 },
    ];
    const renderOption = (item: DataSourceType<DataType>) => {
      return (
        <p style={{ marginBottom: 0 }}>
          球星姓名：{item.value},球衣号码：{item.number}
        </p>
      );
    };
    const handleFetch = (query: string) => {
      return lakersWithNumber.filter((item) => item.value.includes(query));
    };
    return (
      <AutoComplete
        placeholder="搜搜湖人队球星名字试试"
        renderOption={renderOption}
        onSelect={action("selected")}
        fetchSuggestions={handleFetch}
      />
    );
  })
  .add("支持异步", () => {
    const handleFetch = (query: string) => {
      return fetch(`https://api.github.com/search/users?q=${query}`)
        .then((res) => res.json())
        .then(({ items }) => {
          return items
            .slice(0, 10)
            .map((item: any) => ({ value: item.url, ...item }));
        });
    };
    const renderOption = (item: DataSourceType<GithubDataType>) => {
      return <p style={{ marginBottom: 0 }}>Github: {item.url}</p>;
    };
    return (
      <AutoComplete
        placeholder="搜搜Github账户名试试"
        renderOption={renderOption}
        onSelect={action("selected")}
        fetchSuggestions={handleFetch}
      />
    );
  });
