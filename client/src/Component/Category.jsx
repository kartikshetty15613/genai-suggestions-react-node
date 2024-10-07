import React from "react";
import { useEffect, useState } from "react";
import Styles from "../Stylesheet/Header.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import styles from "../Stylesheet/Header.module.css";
import { useNavigate } from "react-router-dom";

const Category = ({ recieveCheckedItems }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [categories, setCategory] = useState([]);
  const navigate = useNavigate();

  // Fetching categories from server

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/categories`
      );
      const res = await response.json();
      console.log(res.data);
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(checkedItems);

  // Function to handle individual checkbox change
  const handleSubCategoryCheckboxChange = (
    categoryId,
    categoryName,
    subcategoryId,
    subcategoryName
  ) => {
    setCheckedItems((prevCheckedItems) => {
      const categoryIndex = prevCheckedItems.findIndex(
        (item) => item.id === categoryId
      );

      // Category exists in checkedItems
      if (categoryIndex !== -1) {
        const updatedSubCategories = prevCheckedItems[
          categoryIndex
        ].subCategories.some((sub) => sub.id === subcategoryId)
          ? prevCheckedItems[categoryIndex].subCategories.filter(
              (sub) => sub.id !== subcategoryId
            ) // Uncheck
          : [
              ...prevCheckedItems[categoryIndex].subCategories,
              { id: subcategoryId, name: subcategoryName },
            ]; // Check

        const updatedCheckedItems = [...prevCheckedItems];
        updatedCheckedItems[categoryIndex] = {
          ...updatedCheckedItems[categoryIndex],
          subCategories: updatedSubCategories,
        };

        return updatedCheckedItems;
      } else {
        // If the category doesn't exist in checkedItems, add it with the subcategory checked (including name)
        return [
          ...prevCheckedItems,
          {
            id: categoryId,
            name: categoryName,
            subCategories: [{ id: subcategoryId, name: subcategoryName }],
          },
        ];
      }
    });
  };

  // Function to handle master checkbox change for the entire category
  const handleCategoryCheckboxChange = (categoryId, categoryName) => {
    setCheckedItems((prevCheckedItems) => {
      const categoryIndex = prevCheckedItems.findIndex(
        (item) => item.id === categoryId
      );
      const allSubCategories = categories
        .find((cat) => cat._id === categoryId)
        .subCategories.map((sub) => ({ id: sub._id, name: sub.name }));

      if (categoryIndex !== -1) {
        const categoryInCheckedItems = prevCheckedItems[categoryIndex];
        const isAllChecked =
          categoryInCheckedItems.subCategories.length ===
          allSubCategories.length;

        if (isAllChecked) {
          // Uncheck all subcategories
          return prevCheckedItems.map((item) =>
            item.id === categoryId ? { ...item, subCategories: [] } : item
          );
        } else {
          // Check all subcategories
          return prevCheckedItems.map((item) =>
            item.id === categoryId
              ? { ...item, subCategories: allSubCategories }
              : item
          );
        }
      } else {
        // Category doesn't exist in checkedItems, add it with all subcategories checked
        return [
          ...prevCheckedItems,
          {
            id: categoryId,
            name: categoryName,
            subCategories: allSubCategories,
          },
        ];
      }
    });
  };

  const handleSelectedCategories = (e) => {
    e.preventDefault();
    console.log(checkedItems);
    if (!(checkedItems.length === 0)) {
      recieveCheckedItems(checkedItems);
      navigate("/feedback");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Box className={styles.box} sx={{ flexGrow: "1" }}>
        <AppBar position="static" sx={{ backgroundColor: "#60d8af" }}>
          <Toolbar sx={{ paddingLeft: "10px" }}>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Enterprise AI
            </Typography>

            <Button
              variant="contained"
              sx={{ backgroundColor: "#1a4d2e" }}
              endIcon={<SendIcon />}
              onClick={handleSelectedCategories}
            >
              Next
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <div
        className={Styles.categoryGrid}
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "35px",
        }}
      >
        {categories.map((category) => (
          <div key={category._id}>
            {/* Checkbox for the whole category */}
            <h3>
              <label>
                <input
                  type="checkbox"
                  checked={
                    (
                      checkedItems.find((item) => item.id === category._id)
                        ?.subCategories || []
                    ).length === category.subCategories.length
                  }
                  onChange={() =>
                    handleCategoryCheckboxChange(category._id, category.name)
                  }
                />
                {category.name}
              </label>
            </h3>

            {/* Subcategory checkboxes */}
            {category.subCategories.map((subcategory) => (
              <div key={subcategory._id} style={{ marginLeft: "20px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      checkedItems
                        .find((item) => item.id === category._id)
                        ?.subCategories.some(
                          (sub) => sub.id === subcategory._id
                        ) || false
                    }
                    onChange={() =>
                      handleSubCategoryCheckboxChange(
                        category._id,
                        category.name,
                        subcategory._id,
                        subcategory.name
                      )
                    }
                  />
                  {subcategory.name}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Category;
