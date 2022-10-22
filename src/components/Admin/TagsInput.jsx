import { useState } from "react";
import { Form } from "react-bootstrap";
import { WithContext as ReactTags } from "react-tag-input";
import { render } from "react-router-dom";
import "../../App.css";
export const TagsInput = (props) => {
  const [tags, setTags] = useState([]);
  const suggestions = props.items.map((item) => {
    return {
      id: item.name,
      text: item.name
    };
  });

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <div>
      <ReactTags
        classNames={{
          tagInputField: "tagInputFieldClass",
          tagInput: "tagInputClass",
          remove: "removeClass",
          tags: 'tagsClass'
        }}
        tags={tags}
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        inputFieldPosition="top"
        autocomplete
      />
    </div>
  );
};
