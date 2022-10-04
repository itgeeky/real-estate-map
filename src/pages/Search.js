import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { Flex, Box, Text, Icon, Button } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import noresult from "../assets/images/noresult.svg";
import SearchFilters from "../components/SearchFilter";
import Property from "../components/Property";

const Search = () => {
  /*
  const [searchFilters, setSearchFilters] = useState(false);
  const [properties, setProperties ]=useState({})
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  
  const purpose = params.get('purpose') || 'for-rent';
  const rentFrequency = params.get('rentFrequency') || 'yearly';
  const minPrice = params.get('minPrice') || '0';
  const maxPrice = params.get('maxPrice') || '1000000';
  const roomsMin = params.get('roomsMin') || '0';
  const bathsMin = params.get('bathsMin') || '0';
  const sort = params.get('sort')|| 'price-desc';
  const areaMax = params.get('areaMax') || '35000';
  const locationExternalIDs = params.get('locationExternalIDs') || '5002';
  const categoryExternalID = params.get('categoryExternalID') || '4';


  const getProperty = useCallback(async () => {
    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);
    return data?.hits
  }, []);

  useEffect(() => {
    getProperty().then((res) => {
      setProperties(res);
    });
  }, [getProperty]);
  
*/
  const [showFilters, setShowFilters] = useState(false);
  return (
    <Flex h="100" w="100" border="1px solid red">
      <Flex w="50%" border="1px solid blue">
        <Button onClick={()=> setShowFilters((curr)=> !curr)}>Show Filters</Button>
        {showFilters && <SearchFilters/>}
      </Flex>
      <Box w="50%"></Box>
    </Flex>
  );
};

export default Search;
