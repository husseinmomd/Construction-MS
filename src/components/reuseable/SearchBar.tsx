import { FunctionComponent } from "react";

interface SearchBarProps {
  placeholder: string;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar: FunctionComponent<SearchBarProps> = ({
  placeholder,
  query,
  setQuery,
}) => {
  return (
    <div style={{ flex: 1 }} className="search-input-group-style input-group">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-search"
          >
            <circle cx={11} cy={11} r={8} />
            <line x1={21} y1={21} x2="16.65" y2="16.65" />
          </svg>
        </span>
      </div>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        className="form-control"
        placeholder={placeholder}
        aria-describedby="basic-addon1"
      />
    </div>
  );
};
