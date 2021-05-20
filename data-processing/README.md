# data-processing

This directory contains information about preparing data for use in the frontent app.

## FAR

This data is handled in the `Makefile`.

### Prerequisites

To run this you will need:
 * [SQLite](https://www.sqlite.org/index.html)
 * [csvkit](https://csvkit.readthedocs.io/en/latest/)
 * An account with [geocod.io](https://www.geocod.io/)
 * An API key from geocod.io included as an environment variable named `GEOCODIO_API_KEY`

You will also need to add the [far_exitdestinations.csv](https://drive.google.com/file/d/1FH28hIDX0PNW94msREXRZWFBCyXaFkZo/view) file downloaded and in the `input/` directory.

### Generating the files

Run `make far`.

The steps are as follows:
 1. Generate a file of cities and states to geocode. We gather up all of the cities and states and only geocode unique addresses in order to do this efficiently.
 2. Geocode the addresses found in (1).
 3. Join the FAR entries with the geocoded results. Since we only geocode each address once, joining distributes the results back to the original data.
 4. Split the joined entries by camp. Since these files are relatively large it will be helpful to have them split up into more practical slices.
