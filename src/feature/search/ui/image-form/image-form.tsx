import cn from "classnames";
import searchIcon from "../../../../shared/assets/icons/search-icon.svg";
import { Button } from "../../../../shared/ui/button/button.tsx";
import { Input } from "../../../../shared/ui/input";
import s from "./image-form.module.scss";

type ImageFormProps = {
  query: string;
  setQuery: (e: string) => void;
  error: string;
  loading: boolean;
  count: number;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  onClear?: () => void;
};

export const ImageForm = ({
  query,
  setQuery,
  handleSearch,
  count,
  error,
  loading,
  onClear,
}: ImageFormProps) => {
  return (
    <header className={s.header}>
      <div className="container">
        <form onSubmit={handleSearch} className={cn(s.form, {})}>
          <div
            className={cn(s.flex, {
              [s.active]: count === 0 && !error && !loading,
            })}
          >
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Телефоны, яблоки, груши..."
              rightSection={
                <span className={s.icon}>
                  <img src={searchIcon} alt="serach icon" />
                </span>
              }
              type="search"
              allowClear
              onClear={onClear || (() => setQuery(""))}
            />
            <Button type="submit">Искать</Button>
          </div>
        </form>
      </div>
    </header>
  );
};
