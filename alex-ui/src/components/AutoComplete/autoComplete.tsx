import React, {
  FC,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
} from "react";
import clasNames from "classnames";
import { InputProps, Input } from "../Input/input";
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";
import { useDebounce } from "../../hooks/useDebounce";
import { useClickOutside } from "../../hooks/useClickOutside";

//  按照用户的使用变换类型；
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;

// 继承所有的input属性
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    item: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;
  const [inputVal, setInputVall] = useState(value);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hightlightIndex, setHighlightIndex] = useState(-1);
  const [debounceVal] = useDebounce(inputVal, 500);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  //点击组件之外时，收起
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });
  useEffect(() => {
    if (debounceVal && triggerSearch.current) {
      const result = fetchSuggestions(debounceVal);
      if (result instanceof Promise) {
        setLoading(true);
        result.then((res) => {
          setSuggestions(res);
          setLoading(false);
        });
      } else {
        setSuggestions(result);
      }
    } else {
      setSuggestions([]);
    }
    setHighlightIndex(-1);
  }, [debounceVal, fetchSuggestions]);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputVall(value);
    triggerSearch.current = true;
  };
  const handleClickItem = (item: DataSourceType) => {
    setInputVall(item.value);
    setSuggestions([]);
    onSelect && onSelect(item);
    triggerSearch.current = false;
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropdown = () => {
    return (
      <Transition
        in={!!suggestions.length || loading}
        animation="zoom-in-top"
        timeout={300}
        onExit={() => {
          setSuggestions([]);
        }}
      >
        <ul className="alex-suggestion-list">
          {suggestions.map((item, index) => {
            const classes = clasNames("suggestion-item", {
              "is-active": hightlightIndex === index,
            });
            return (
              <li
                key={index}
                className={classes}
                onClick={() => handleClickItem(item)}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
          {loading && (
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
        </ul>
      </Transition>
    );
  };
  const handleKeyDowm = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) index = suggestions.length - 1;
    setHighlightIndex(index);
  };
  const onKeyDowm = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      // 回车
      case 13:
        if (suggestions[hightlightIndex]) {
          handleClickItem(suggestions[hightlightIndex]);
        }
        break;
      // 上
      case 38:
        handleKeyDowm(hightlightIndex - 1);
        break;
      // 下
      case 40:
        handleKeyDowm(hightlightIndex + 1);
        break;
      // esc
      case 27:
        setSuggestions([]);
        break;
      default:
        break;
    }
  };
  return (
    <div className="alex-auto-complete" ref={componentRef}>
      <Input
        {...restProps}
        value={inputVal}
        onChange={onChange}
        onKeyDown={onKeyDowm}
      />
      {generateDropdown()}
    </div>
  );
};
export default AutoComplete;
