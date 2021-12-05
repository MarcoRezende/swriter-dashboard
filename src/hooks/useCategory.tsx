import { createContext, useContext } from "react";
import { Category } from "../models/Category";
import { categoryResource } from "../services/category";
import { createOneBase } from "../services/common";

export interface CategoryAPI {
  createOne(categoryDto: Category): Promise<Category>;
}

export const CategoryContext = createContext<CategoryAPI>({} as CategoryAPI);

export const CategoryProvider: React.FC = ({ children }) => {
  const createOne = async (categoryDto: Category): Promise<Category> => {
    const category = new Category(categoryDto);

    return (
      (await createOneBase<Category>({
        resource: categoryResource,
        data: category,
      })) || ({} as Category)
    );
  };

  return (
    <CategoryContext.Provider value={{ createOne }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = (): CategoryAPI => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategory must be within a CategoryContext");
  }

  return context;
};
