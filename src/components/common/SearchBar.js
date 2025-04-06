import React from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { SearchIcon } from "../../assests/icon";

export default function SearchBar (props) {
    const {searchText, setSearchText} = props;
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }
    return (
        <Form className="mb-3">
            <InputGroup>
                <FormControl
                type="search"
                placeholder="Search Song, Artist"
                value={searchText}
                onChange={(e)=>setSearchText(e.target.value)}
                />
                <InputGroup.Text>
                <SearchIcon className="searchicon" onClick={handleSearch} />
                </InputGroup.Text>
            </InputGroup>
        </Form>
  );
};
