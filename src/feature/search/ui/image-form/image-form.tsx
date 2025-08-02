import cn from "classnames";
import s from "./image-form.module.scss";
import { Input } from "../../../../shared/ui/input";
import searchIcon from "../../../../shared/assets/icons/search-icon.svg";
import { Button } from "../../../../shared/ui/button/button.tsx";

type ImageFormProps = {
  query: string;
  setQuery: (e: string) => void;
  error: string;
  loading: boolean;
  count: number;
  handleSearch: () => void;
};

export const ImageForm = ({
  query,
  setQuery,
  handleSearch,
  count,
  error,
  loading,
}: ImageFormProps) => {
  return (
    <form
      onSubmit={handleSearch}
      className={cn(s.form, {
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
        onClear={() => setQuery("")}
      />
      <Button type="submit">Искать</Button>
    </form>
  );
};
