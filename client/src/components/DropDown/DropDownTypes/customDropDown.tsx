import classes from "./CustomDropDown.module.scss";

function CustomDropDown() {
  return (
    <div className={classes.CustomDropDown}>
      <div className={classes.Baths}>
        <div className={classes.bathsTitle}>
          <h2>Baths</h2>
        </div>
        <div className={classes.Bathrooms}>
          <div>
            <input type="checkbox" />
            <label htmlFor=""> Any</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor=""> 1+Bathrooms</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor=""> 2+Bathrooms</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor=""> 3+Bathrooms</label>
          </div>
        </div>
      </div>
      <div className={classes.Amenities}>
        <div className={classes.amenitiesTitle}>
          <h2>Amenities</h2>
        </div>
        <div className={classes.amenitiesBox}>
          <div>
            <input type="checkbox" />
            <label htmlFor=""> Air Conditioning(Totals)</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">In Unit Washer and Dryer(Totals)</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor=""> Washer and Dryer Hookups(Totals)</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Dishwasher(Totals)</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Wheelchair Access(Totals)</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Parking(Totals)</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Laundry Facilities(Totals)</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Fitness Center(Totals)</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Pool(Totals)</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Elevator(Totals)</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Dog Friendly(Totals)</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Cat Friendly(Totals)</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Furnished(Totals)</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Lofts(Totals)</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Utilities Included(Totals)</label>
          </div>
        </div>
      </div>
      <div className={classes.Affordability}>
        <div className={classes.AffordabilityTitle}>
          <h2>Affordability</h2>
        </div>
        <div className={classes.affordabilityBox}>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Low Income(Totals)</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Luxury(Totals)</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Cheap(Totals)</label>
          </div>
        </div>
      </div>
      <div className={classes.Keywords}>
        <div className={classes.keywordsTitle}>
          <h2>Keywords</h2>
        </div>
        <div className={classes.keywordsBox}>
          <input
            type="text"
            placeholder="Separate by commas (i.e. fireplace, carpet, oven)"
          />
        </div>
      </div>
      <div className={classes.Square}>
        <div className={classes.squareTitle}>
          <h2>Square Feet</h2>
        </div>
        <div className={classes.squareBox}>
          <select name="" id="">
            <option value="">No Min</option>
            <option value="">100</option>
            <option value="">200</option>
            <option value="">300</option>
          </select>
          <select name="" id="">
            <option value="">No Max</option>
            <option value="">1000</option>
            <option value="">2000</option>
            <option value="">3000</option>
          </select>
        </div>
      </div>
      <div className={classes.Rating}>
        <div className={classes.ratingTitle}>
          <h2>Rating</h2>
        </div>
        <div className={classes.ratingBox}>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Starts(Total)</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Starts(Total)</label>
          </div>
        </div>
      </div>
      <div className={classes.Closure}>
        <div className={classes.topClosure}></div>
        <div className={classes.buttons}>
          <button className={classes.clear}>Clear</button>
          <button className={classes.done}>Done</button>
        </div>
      </div>
    </div>
  );
}

export default CustomDropDown;
