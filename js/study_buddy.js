$(document).ready(function () {
    const input = $(".dropdown-input");
    const list = $(".dropdown-list");
    const categories = $(".category");
    const categoryItems = $(".category-items");
    const items = $(".dropdown-item");
  
    input.on("focus", function (e) {
      $(e.currentTarget).siblings(".dropdown-list").css("display", "block");
      console.log($(e.currentTarget).siblings(".dropdown-list"));
    });
  
    input.on("input", function () {
      const searchText = input.val().toLowerCase();
  
      categories.each(function (index) {
        const categoryItemsList = categoryItems.eq(index);
        const categoryText = $(this).text().toLowerCase();
        let categoryVisible = false;
  
        const itemsToShow = [];
  
        categoryItemsList.find(".dropdown-item").each(function () {
          const itemText = $(this).text().toLowerCase();
          if (itemText.includes(searchText)) {
            $(this).css("display", "block");
            itemsToShow.push($(this));
            categoryVisible = true;
          } else {
            $(this).css("display", "none");
          }
        });
  
        if (categoryText.includes(searchText) || categoryVisible) {
          categoryItemsList.css("display", "block");
          $(this).css("display", "block");
  
          if (categoryText.includes(searchText)) {
            categoryItemsList.find(".dropdown-item").css("display", "block");
          } else if (itemsToShow.length > 0) {
            itemsToShow.forEach(function (item) {
              item.css("display", "block");
            });
          }
        } else {
          categoryItemsList.css("display", "none");
          $(this).css("display", "none");
        }
      });
  
      list.css(
        "display",
        categories.toArray().some(function (category) {
          return $(category).css("display") === "block";
        })
          ? "block"
          : "none"
      );
    });
  
    categories.on("click", function (event) {
      const index = categories.index(this);
      const categoryItemsList = categoryItems.eq(index);
      if (categoryItemsList.css("display") === "none") {
        categoryItemsList.css("display", "block");
      } else {
        categoryItemsList.css("display", "none");
      }
      event.stopPropagation();
    });
  
    items.on("click", function () {
      input.val($(this).text());
      list.css("display", "none");
    });
  
    $(document).on("click", function (event) {
      if (!input.is(event.target) && input.has(event.target).length === 0) {
        list.css("display", "none");
      }
    });
  });
  