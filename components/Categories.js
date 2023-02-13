import React from "react";
import { ScrollView } from "react-native";
import sanityCilent, { urlFor } from "../sanity";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    sanityCilent.fetch(`
      *[_type == "category"]
    `).then(data => {
      setCategories(data);
    }).catch(error => { });
  }, []);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>

      {
        categories?.map(category => (
          <CategoryCard
            key={category._id}
            imgURL={urlFor(category.image).width(200).url()}
            title={category.name}
          />
        ))
      }
    </ScrollView>
  );
};

export default Categories;
