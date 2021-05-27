# Clean up original FAR data to get a file to geocode
far-get-geocode-file:
	rm -f output/far_exitdestinations_to_geocode.csv
	csvsql --query "select trim(\"pre-exclusion_address\") || trim(\"pre-exclusion_state\") || trim(\"pre-exclusion_country\") as pre_location_id, trim(\"final_departure_destination\") || trim(\"final_departure_state\") || trim(\"final_departure_country\") as departure_location_id, * from 'far_exitdestinations'" input/far_exitdestinations.csv > output/far_exitdestinations_with_ids.csv
	csvsql --query "select trim(\"pre-exclusion_address\") as city, trim(\"pre-exclusion_state\") as state, trim(\"pre-exclusion_country\") as country from 'far_exitdestinations' group by city, state, country" input/far_exitdestinations.csv > output/far_exitdestinations_to_geocode_raw.csv
	csvsql --query "select trim(\"final_departure_destination\") as city, trim(\"final_departure_state\") as state, trim(\"final_departure_country\") as country from 'far_exitdestinations' group by city, state, country" input/far_exitdestinations.csv | tail -n +2 >> output/far_exitdestinations_to_geocode_raw.csv
	csvsort output/far_exitdestinations_to_geocode_raw.csv | uniq > output/far_exitdestinations_to_geocode.csv
	rm -f output/far_exitdestinations_to_geocode_raw.csv

# Geocode the FAR locations
far-geocode:
	csvjson output/far_exitdestinations_to_geocode.csv | \
		curl -X POST -H "Content-Type: application/json" -d @- \
	  	https://api.geocod.io/v1.6/geocode?api_key=${GEOCODIO_API_KEY} | \
		in2csv -f json -k results > output/far_exitdestinations_geocoded.csv

# Join geocoded results
far-join:
	rm -f far.db
	csvsql --db "sqlite:///far.db" --tables exitdestinations --insert output/far_exitdestinations_with_ids.csv 
		csvcut -c "query/city,query/state,query/country,response/results/0/location/lat,response/results/0/location/lng" output/far_exitdestinations_geocoded.csv |\
  		csvsql --query "select \"query/city\" || \"query/state\" || \"query/country\" as location_id, \"query/country\" as country, \"response/results/0/location/lat\" as lat, \"response/results/0/location/lng\" as lng from 'stdin'" -- |\
		csvsql --db "sqlite:///far.db" --tables geocoded --insert
	sqlite3 far.db "update geocoded set lat = 35.662, lng = 139.653 where lat is null and lng is null and country = 'JP'"
	sql2csv --db "sqlite:///far.db" --query "select a.*, b.lat as pre_lat, b.lng as pre_lng, c.lat as dest_lat, c.lng as dest_lng from exitdestinations a left join geocoded as b on a.pre_location_id = b.location_id left join geocoded as c on a.departure_location_id = c.location_id" |\
		csvsql --db "sqlite:///far.db" --tables joined --insert

# Split geocoded results by camp
far-split:
	sqlite3 far.db "select distinct camp from joined" |\
		xargs -I % /bin/bash -c \
		'csvsql --db "sqlite:///far.db" --query "select far_id, camp, \"pre-exclusion_address\" as pre_city, \"pre-exclusion_state\" as pre_state, final_departure_destination as dest_city, final_departure_state as dest_state, date_of_final_departure, pre_lat, pre_lng, dest_lat, dest_lng from joined where camp = \"%\"" > output/`sed "s/[[:digit:]]\+-//" <<< %`.csv'

far: far-get-geocode-file far-geocode far-join far-split
