export interface State {
  slug: string;
  name: string;
  abbr: string;
  region: "Northeast" | "Midwest" | "South" | "West";
  priority: boolean;
  cities: string[];
  blurb: string;
}

export const states: State[] = [
  { slug: "alabama", name: "Alabama", abbr: "AL", region: "South", priority: false, cities: ["Birmingham", "Montgomery", "Huntsville", "Mobile", "Tuscaloosa"], blurb: "manufacturing, healthcare and aerospace" },
  { slug: "alaska", name: "Alaska", abbr: "AK", region: "West", priority: false, cities: ["Anchorage", "Fairbanks", "Juneau"], blurb: "energy, logistics and tourism" },
  { slug: "arizona", name: "Arizona", abbr: "AZ", region: "West", priority: true, cities: ["Phoenix", "Scottsdale", "Tucson", "Mesa", "Tempe", "Chandler"], blurb: "tech, healthcare and real estate" },
  { slug: "arkansas", name: "Arkansas", abbr: "AR", region: "South", priority: false, cities: ["Little Rock", "Fayetteville", "Bentonville", "Fort Smith"], blurb: "retail, logistics and agriculture" },
  { slug: "california", name: "California", abbr: "CA", region: "West", priority: true, cities: ["Los Angeles", "San Diego", "San Francisco", "San Jose", "Anaheim", "Irvine", "Sacramento", "Oakland"], blurb: "technology, entertainment, biotech and DTC commerce" },
  { slug: "colorado", name: "Colorado", abbr: "CO", region: "West", priority: true, cities: ["Denver", "Boulder", "Colorado Springs", "Fort Collins", "Aurora"], blurb: "tech, outdoor brands and cannabis" },
  { slug: "connecticut", name: "Connecticut", abbr: "CT", region: "Northeast", priority: true, cities: ["Stamford", "Greenwich", "New Haven", "Hartford", "Bridgeport", "Norwalk", "Danbury", "Waterbury", "New Britain", "Bristol", "Meriden", "West Hartford", "Milford", "Fairfield", "Middletown"], blurb: "finance, insurance and professional services" },
  { slug: "delaware", name: "Delaware", abbr: "DE", region: "South", priority: false, cities: ["Wilmington", "Dover", "Newark"], blurb: "finance, legal and corporate services" },
  { slug: "florida", name: "Florida", abbr: "FL", region: "South", priority: true, cities: ["Miami", "Orlando", "Tampa", "Fort Lauderdale", "West Palm Beach", "Jacksonville", "Naples"], blurb: "real estate, hospitality, healthcare and e-commerce" },
  { slug: "georgia", name: "Georgia", abbr: "GA", region: "South", priority: true, cities: ["Atlanta", "Savannah", "Augusta", "Alpharetta", "Marietta"], blurb: "fintech, logistics and media" },
  { slug: "hawaii", name: "Hawaii", abbr: "HI", region: "West", priority: false, cities: ["Honolulu", "Hilo", "Kailua"], blurb: "hospitality, tourism and local services" },
  { slug: "idaho", name: "Idaho", abbr: "ID", region: "West", priority: false, cities: ["Boise", "Meridian", "Idaho Falls"], blurb: "tech, agriculture and outdoor brands" },
  { slug: "illinois", name: "Illinois", abbr: "IL", region: "Midwest", priority: true, cities: ["Chicago", "Schaumburg", "Naperville", "Aurora", "Springfield"], blurb: "finance, manufacturing, healthcare and SaaS" },
  { slug: "indiana", name: "Indiana", abbr: "IN", region: "Midwest", priority: false, cities: ["Indianapolis", "Fort Wayne", "Carmel", "Bloomington"], blurb: "manufacturing, healthcare and logistics" },
  { slug: "iowa", name: "Iowa", abbr: "IA", region: "Midwest", priority: false, cities: ["Des Moines", "Cedar Rapids", "Iowa City"], blurb: "insurance, agriculture and biotech" },
  { slug: "kansas", name: "Kansas", abbr: "KS", region: "Midwest", priority: false, cities: ["Wichita", "Overland Park", "Kansas City", "Topeka"], blurb: "aerospace, agriculture and logistics" },
  { slug: "kentucky", name: "Kentucky", abbr: "KY", region: "South", priority: false, cities: ["Louisville", "Lexington", "Bowling Green"], blurb: "logistics, manufacturing and healthcare" },
  { slug: "louisiana", name: "Louisiana", abbr: "LA", region: "South", priority: false, cities: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette"], blurb: "energy, hospitality and healthcare" },
  { slug: "maine", name: "Maine", abbr: "ME", region: "Northeast", priority: false, cities: ["Portland", "Bangor", "Augusta"], blurb: "tourism, healthcare and trades" },
  { slug: "maryland", name: "Maryland", abbr: "MD", region: "South", priority: true, cities: ["Baltimore", "Bethesda", "Rockville", "Silver Spring", "Annapolis"], blurb: "biotech, government, defense and healthcare" },
  { slug: "massachusetts", name: "Massachusetts", abbr: "MA", region: "Northeast", priority: true, cities: ["Boston", "Cambridge", "Worcester", "Springfield", "Lowell", "Quincy"], blurb: "biotech, SaaS, education and healthcare" },
  { slug: "michigan", name: "Michigan", abbr: "MI", region: "Midwest", priority: false, cities: ["Detroit", "Grand Rapids", "Ann Arbor", "Lansing"], blurb: "automotive, manufacturing and healthcare" },
  { slug: "minnesota", name: "Minnesota", abbr: "MN", region: "Midwest", priority: false, cities: ["Minneapolis", "Saint Paul", "Rochester", "Bloomington"], blurb: "healthcare, retail and SaaS" },
  { slug: "mississippi", name: "Mississippi", abbr: "MS", region: "South", priority: false, cities: ["Jackson", "Gulfport", "Hattiesburg"], blurb: "manufacturing, healthcare and trades" },
  { slug: "missouri", name: "Missouri", abbr: "MO", region: "Midwest", priority: false, cities: ["Kansas City", "St. Louis", "Springfield", "Columbia"], blurb: "logistics, healthcare and finance" },
  { slug: "montana", name: "Montana", abbr: "MT", region: "West", priority: false, cities: ["Billings", "Bozeman", "Missoula"], blurb: "outdoor brands, real estate and trades" },
  { slug: "nebraska", name: "Nebraska", abbr: "NE", region: "Midwest", priority: false, cities: ["Omaha", "Lincoln", "Bellevue"], blurb: "insurance, agriculture and tech" },
  { slug: "nevada", name: "Nevada", abbr: "NV", region: "West", priority: true, cities: ["Las Vegas", "Reno", "Henderson"], blurb: "hospitality, gaming and e-commerce" },
  { slug: "new-hampshire", name: "New Hampshire", abbr: "NH", region: "Northeast", priority: false, cities: ["Manchester", "Nashua", "Concord"], blurb: "tech, manufacturing and tourism" },
  { slug: "new-jersey", name: "New Jersey", abbr: "NJ", region: "Northeast", priority: true, cities: ["Englewood", "Bergen County", "Jersey City", "Newark", "Hoboken", "Fort Lee", "Hackensack", "Paramus", "Paterson", "Elizabeth", "Edison", "Woodbridge", "Lakewood", "Toms River", "Trenton", "Clifton", "Camden", "Princeton", "Morristown", "Montclair", "Teaneck"], blurb: "pharma, finance, e-commerce and professional services" },
  { slug: "new-mexico", name: "New Mexico", abbr: "NM", region: "West", priority: false, cities: ["Albuquerque", "Santa Fe", "Las Cruces"], blurb: "energy, defense and tourism" },
  { slug: "new-york", name: "New York", abbr: "NY", region: "Northeast", priority: true, cities: ["New York City", "Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "New Rochelle", "Mount Vernon", "Schenectady", "Utica", "White Plains", "Long Island", "Hempstead", "Garden City", "Melville", "Ithaca", "Westchester"], blurb: "finance, media, fashion, real estate and SaaS" },
  { slug: "north-carolina", name: "North Carolina", abbr: "NC", region: "South", priority: true, cities: ["Charlotte", "Raleigh", "Durham", "Greensboro", "Winston-Salem"], blurb: "fintech, biotech and manufacturing" },
  { slug: "north-dakota", name: "North Dakota", abbr: "ND", region: "Midwest", priority: false, cities: ["Fargo", "Bismarck", "Grand Forks"], blurb: "energy, agriculture and trades" },
  { slug: "ohio", name: "Ohio", abbr: "OH", region: "Midwest", priority: false, cities: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"], blurb: "healthcare, manufacturing and finance" },
  { slug: "oklahoma", name: "Oklahoma", abbr: "OK", region: "South", priority: false, cities: ["Oklahoma City", "Tulsa", "Norman"], blurb: "energy, aerospace and healthcare" },
  { slug: "oregon", name: "Oregon", abbr: "OR", region: "West", priority: false, cities: ["Portland", "Eugene", "Salem", "Beaverton"], blurb: "tech, outdoor brands and DTC" },
  { slug: "pennsylvania", name: "Pennsylvania", abbr: "PA", region: "Northeast", priority: true, cities: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Scranton", "Bethlehem", "Lancaster", "Harrisburg", "York", "Altoona", "Wilkes-Barre", "State College", "King of Prussia", "Conshohocken", "West Chester"], blurb: "healthcare, finance, education and manufacturing" },
  { slug: "rhode-island", name: "Rhode Island", abbr: "RI", region: "Northeast", priority: false, cities: ["Providence", "Warwick", "Cranston"], blurb: "healthcare, education and services" },
  { slug: "south-carolina", name: "South Carolina", abbr: "SC", region: "South", priority: false, cities: ["Charleston", "Columbia", "Greenville"], blurb: "manufacturing, hospitality and healthcare" },
  { slug: "south-dakota", name: "South Dakota", abbr: "SD", region: "Midwest", priority: false, cities: ["Sioux Falls", "Rapid City", "Aberdeen"], blurb: "finance, healthcare and agriculture" },
  { slug: "tennessee", name: "Tennessee", abbr: "TN", region: "South", priority: false, cities: ["Nashville", "Memphis", "Knoxville", "Chattanooga"], blurb: "healthcare, music, logistics and SaaS" },
  { slug: "texas", name: "Texas", abbr: "TX", region: "South", priority: true, cities: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "Plano", "Frisco"], blurb: "energy, tech, healthcare and e-commerce" },
  { slug: "utah", name: "Utah", abbr: "UT", region: "West", priority: false, cities: ["Salt Lake City", "Provo", "Lehi", "Ogden"], blurb: "SaaS, finance and outdoor brands" },
  { slug: "vermont", name: "Vermont", abbr: "VT", region: "Northeast", priority: false, cities: ["Burlington", "Montpelier", "Rutland"], blurb: "tourism, food brands and trades" },
  { slug: "virginia", name: "Virginia", abbr: "VA", region: "South", priority: true, cities: ["Arlington", "Alexandria", "Richmond", "Tysons", "Fairfax", "Virginia Beach", "Norfolk"], blurb: "government, tech, defense and professional services" },
  { slug: "washington", name: "Washington", abbr: "WA", region: "West", priority: true, cities: ["Seattle", "Bellevue", "Tacoma", "Spokane", "Redmond"], blurb: "cloud, SaaS, e-commerce and biotech" },
  { slug: "west-virginia", name: "West Virginia", abbr: "WV", region: "South", priority: false, cities: ["Charleston", "Huntington", "Morgantown"], blurb: "energy, healthcare and trades" },
  { slug: "wisconsin", name: "Wisconsin", abbr: "WI", region: "Midwest", priority: false, cities: ["Milwaukee", "Madison", "Green Bay"], blurb: "manufacturing, healthcare and insurance" },
  { slug: "wyoming", name: "Wyoming", abbr: "WY", region: "West", priority: false, cities: ["Cheyenne", "Casper", "Jackson"], blurb: "energy, tourism and trades" },
  { slug: "washington-dc", name: "Washington DC", abbr: "DC", region: "South", priority: true, cities: ["Washington DC", "Capitol Hill", "Georgetown", "Downtown DC", "Dupont Circle"], blurb: "government, nonprofits, legal and policy" },
];

export const getState = (slug: string) => states.find((s) => s.slug === slug);
export const priorityStates = states.filter((s) => s.priority);
