import EmptyState from "../EmptyState/EmptyState";
import { Spinner } from "../Spinner/Spinner";

import { componentMountVariants } from "../../config/config";

interface EntityListProps<T> {
  items: T[];
  isLoading?: boolean;
  emptyText: string;
  loadingLabel?: string;
  containerClassName?: string;
  renderItem: (item: T) => React.ReactNode;
}

const EntityList = <T,>({
  items,
  isLoading,
  emptyText,
  loadingLabel,
  containerClassName,
  renderItem,
}: EntityListProps<T>) => {
  if (isLoading) {
    return (
      <div className={containerClassName}>
        <Spinner label={loadingLabel} />
      </div>
    );
  }

  if (!items.length) {
    return (
      <EmptyState animationVariant={componentMountVariants}>
        <p>{emptyText}</p>
      </EmptyState>
    );
  }

  return <div className={containerClassName}>{items.map(renderItem)}</div>;
};

export default EntityList;
