import { useLocation } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import Property from '../components/Porperty';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import noresult from '../assets/images/noresult.svg'
import SearchFilters from '../components/SearchFilter';

const Search = () => { 
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
  

  return (
    <>
    {!!properties &&(
      <Box>
      <Flex
        onClick={() => setSearchFilters(!searchFilters)}
        cursor='pointer'
        bg='gray.100'
        borderBottom='1px'
        borderColor='gray.200'
        p='2'
        fontWeight='black'
        fontSize='lg'
        justifyContent='center'
        alignItems='center'
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft='2' w='7' as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize='2xl' p='4' fontWeight='bold'>
        Properties {purpose}
      </Text>
      <Flex flexWrap='wrap'>
        {properties.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
      {properties.length === 0 && (
        <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5'>
          <Image src={noresult} />
          <Text fontSize='xl' marginTop='3'>No Result Found.</Text>
        </Flex>
      )}
    </Box>
    )}
    </>
  )
}

export default Search



