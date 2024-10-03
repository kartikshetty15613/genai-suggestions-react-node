import React from 'react'
import { useEffect, useState } from 'react'
import Header from './Header';
import Styles from "../Stylesheet/Header.module.css"


const Category = ({categories, defaultCheckedItems}) => {
    const [checkedItems, setCheckedItems] = useState(defaultCheckedItems);
  
    // Get data from LocalStorage
    useEffect(() => {
      const storedCheckedItems = localStorage.getItem("checkedItems");
      if (storedCheckedItems) {
        setCheckedItems(JSON.parse(storedCheckedItems));
      }
    }, []);
  
    // Set data to LocalStorage
    useEffect(() => {
      localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
    }, [checkedItems]);
  
    // Function to handle individual checkbox change
    const handleSubCategoryCheckboxChange = (categoryName, subcategoryName) => {
      setCheckedItems((prevCheckedItems) => {
        const categoryInCheckedItems = prevCheckedItems.find(
          (item) => item.name === categoryName
        );
  
        if (categoryInCheckedItems) {
          // Category exists, toggle subcategory
          const subcategories = categoryInCheckedItems.subcategories.includes(subcategoryName)
            ? categoryInCheckedItems.subcategories.filter(
                (sub) => sub !== subcategoryName
              ) // Uncheck
            : [...categoryInCheckedItems.subcategories, subcategoryName]; // Check
  
          // Return updated checkedItems
          return prevCheckedItems.map((item) =>
            item.name === categoryName ? { ...item, subcategories } : item
          );
        } else {
          // Category doesn't exist, add it with the subcategory checked
          return [
            ...prevCheckedItems,
            { name: categoryName, subcategories: [subcategoryName] }
          ];
        }
      });
    };
    
  
    // Function to handle master checkbox change for the entire category
    const handleCategoryCheckboxChange = (categoryName) => {
      setCheckedItems((prevCheckedItems) => {
        const categoryInCheckedItems = prevCheckedItems.find(
          (item) => item.name === categoryName
        );
        const allSubcategories = categories.find(
          (cat) => cat.name === categoryName
        ).subcategories;
  
        if (categoryInCheckedItems && categoryInCheckedItems.subcategories.length === allSubcategories.length) {
          // All subcategories are checked, uncheck them all
          return prevCheckedItems.map((item) =>
            item.name === categoryName ? { ...item, subcategories: [] } : item
          );
        } else if (categoryInCheckedItems) {
          // Some subcategories are checked, check them all
          return prevCheckedItems.map((item) =>
            item.name === categoryName ? { ...item, subcategories: allSubcategories } : item
          );
        } else {
          // Category doesn't exist, add it with all subcategories checked
          return [
            ...prevCheckedItems,
            { name: categoryName, subcategories: allSubcategories }
          ];
        }
      });
    };
  
    return (
      <div>
        <Header />
        <div className={Styles.categoryGrid} style={{width:"100%", display: "grid",gridTemplateColumns: "repeat(4, 1fr)",gap: "35px"}}>
          {categories.map((category) => (
            <div key={category.name}>
              {/* Master Checkbox for the whole category */}
              <h3>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      checkedItems.find((item) => item.name === category.name)
                        ?.subcategories.length ===
                        category.subcategories.length || false
                    }
                    onChange={() => handleCategoryCheckboxChange(category.name)}
                  />
                  {category.name}
                </label>
              </h3>

              {/* Subcategory checkboxes */}
              {category.subcategories.map((subcategory) => (
                <div key={subcategory} style={{ marginLeft: "20px" }}>
                  <label>
                    <input
                      type="checkbox"
                      checked={
                        checkedItems
                          .find((item) => item.name === category.name)
                          ?.subcategories.includes(subcategory) || false
                      }
                      onChange={() =>
                        handleSubCategoryCheckboxChange(
                          category.name,
                          subcategory
                        )
                      }
                    />
                    {subcategory}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };
export default Category



// {/* <div>
//           <h4>Selected Items:</h4>
//           <div>{JSON.stringify(checkedItems)}</div>
//         </div> */}