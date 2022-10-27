import { WithContext as ReactTags } from "react-tag-input";
import { render } from "react-router-dom";
import "../../../App.css";
export const TagsInput = ({items, setInputTag, inputTag, requestData, setRequestData}) => {
  
  const suggestions = items.map((item) => {
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
    setInputTag(inputTag.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setInputTag([...inputTag, tag]);
    const {tags} =  requestData
    const newTag = [...tags]
    newTag.push(tag)
    if(newTag){
      setRequestData({
        ...requestData,
        tags:newTag
      })
    }
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = inputTag.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setInputTag(newTags);
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
        tags={inputTag}
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
