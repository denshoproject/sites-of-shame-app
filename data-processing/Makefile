# Clean up original FAR data to get a file to geocode
far-get-geocode-file:
	csvsql --query "select trim(\"pre-evacuation_address\") || trim(\"pre-evacuation_state\") as pre_location_id, trim(\"final_departure_destination\") || trim(\"final_departure_state\") as departure_location_id, * from 'far_exitdestinations'" input/far_exitdestinations.csv > output/far_exitdestinations_with_ids.csv
	csvsql --query "select trim(\"pre-evacuation_address\") as city, trim(\"pre-evacuation_state\") as state from 'far_exitdestinations' group by city, state" input/far_exitdestinations.csv > output/far_exitdestinations_to_geocode_raw.csv
	csvsql --query "select trim(\"final_departure_destination\") as city, trim(\"final_departure_state\") as state from 'far_exitdestinations' group by city, state" input/far_exitdestinations.csv | tail -n +2 >> output/far_exitdestinations_to_geocode_raw.csv
	csvsort output/far_exitdestinations_to_geocode_raw.csv | uniq > output/far_exitdestinations_to_geocode.csv

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
		csvcut -c "query/city,query/state,response/results/0/location/lat,response/results/0/location/lng" output/far_exitdestinations_geocoded.csv |\
  		csvsql --query "select \"query/city\" || \"query/state\" as location_id, \"response/results/0/location/lat\" as lat, \"response/results/0/location/lng\" as lng from 'stdin'" -- |\
		csvsql --db "sqlite:///far.db" --tables geocoded --insert
	sql2csv --db "sqlite:///far.db" --query "select a.*, b.lat as pre_lat, b.lng as pre_lng, c.lat as dest_lat, c.lng as dest_lng from exitdestinations a left join geocoded as b on a.pre_location_id = b.location_id left join geocoded as c on a.departure_location_id = c.location_id" |\
		csvsql --db "sqlite:///far.db" --tables joined --insert

# Split geocoded results by camp
far-split:
	sqlite3 far.db "select distinct camp from joined" |\
		xargs -I % /bin/bash -c \
		'csvsql --db "sqlite:///far.db" --query "select far_id, camp, \"pre-evacuation_address\" as pre_city, \"pre-evacuation_state\" as pre_state, final_departure_destination as dest_city, final_departure_state as dest_state, date_of_final_departure, pre_lat, pre_lng, dest_lat, dest_lng from joined where camp = \"%\"" > output/`sed "s/[[:digit:]]\+-//" <<< %`.csv'

far: far-get-geocode-file far-geocode far-join far-split
