import { useEffect, useState } from "react";
import {
  Flex,
  Select,
  Box,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

import { filterData, getFilterValues } from "../utils/filterData";

export default function SearchFilters() {
  const [filters] = useState(filterData);

  const searchProperties = (filterValues) => {
    console.log(filterValues);
  };
  /*
    const values = getFilterValues(filterValues)

    values.forEach((item) => {
      if(item.value && filterValues?.[item.name]) {
        query[item.name] = item.value
      }
    })
    navigate({
      pathname: "listing",
      search: createSearchParams({
          path: query
      }).toString()
  });
  };

  useEffect(() => {
    if (searchTerm !== '') {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`);
        setLoading(false);
        setLocationData(data?.hits);
      };

      fetchData();
    }
  }, [searchTerm]);
  */
  return (
    <Flex
      p="4"
      justifyContent="start"
      flexWrap="wrap"
      w="100%"
      borderTop="1px solid gray"
      borderBottom="1px solid gray"
    >
      {filters?.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
            placeholder={filter.placeholder}
            w="fit-content"
            p="2"
            border="1px solid #3051cf"
            height="40px"
            color="rgb(8, 9, 10)"
          >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  );
}
