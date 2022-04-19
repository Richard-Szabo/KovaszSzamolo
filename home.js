
// UserForm
class FormData extends React.Component{
    constructor(props) {
        super(props);

        // Event bindings
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleAreaChange = this.handleAreaChange.bind(this);
        this.handleShiftChange = this.handleShiftChange.bind(this);
      }
    handleShiftChange(e){
        this.props.onShiftChange(e.target.value);
    }
    handleAreaChange(e){
        this.props.onAreaChange(e.target.value);
    }
    handleDateChange(e)
    {
        this.props.onDateChange(e.target.value);
    }
    render()
    {
        const area_value = this.props.area;
        const date_value = this.props.date;
        const shift_value = this.props.shift;
        return(
            <div className="row mt-2 mb-2">
                <div className="col col-4 text-center ps-5 pe-5">
                    <select className="form-select " name="area" id="area" value={area_value} onChange={this.handleAreaChange} >
                        <option value="1">Vibratory clipper</option>
                        <option value="2">Rotary</option>
                    </select>
                </div>
                <div className="col col-4 text-center ps-5 pe-5">
                    <input className="form-control" type="date" name="date" id="date" value={date_value} onChange={this.handleDateChange} />
                </div>
                <div className="col col-4 text-center ps-5 pe-5">
                <select className="form-select " name="shift" id="shift" value={shift_value} onChange={this.handleShiftChange}>
                        <option value="DE">Délelőtt</option>
                        <option value="DU">Délután</option>
                        <option value="ÉJ">Éjszaka</option>
                    </select>
                </div>
            </div>
        );
    }
}


// Main container of the application 
class Container extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flour: 600,
            kovaszPer: 25,
            waterPer: 65,
            saltPer: 2 
        }

        //Fallback values from the user form, event bindings
        this.handleFlourChange = this.handleFlourChange.bind(this);
        this.handleKovaszPerChange = this.handleKovaszPerChange.bind(this);
        this.handleWaterPerChange = this.handleWaterPerChange.bind(this);
        this.handleSaltPerChange = this.handleSaltPerChange.bind(this);
    }
    
    // Events for userform
    handleFlourChange(value){
        this.setState({
            flour:value.target.value
        });
    }
    handleKovaszPerChange(value){
        this.setState({
            kovaszPer:value.target.value
        });
    }
    handleWaterPerChange(value){
        this.setState({
            waterPer:value.target.value
        });
    }
    handleSaltPerChange(value){
        this.setState({
            saltPer:value.target.value
        });
    }
    // Render the application
    render(){
        const flour = this.state.flour;
        const kovaszPer = this.state.kovaszPer;
        const waterPer = this.state.waterPer;
        const saltPer = this.state.saltPer;
        const kovasz = flour  * (this.state.kovaszPer/100);

        const water = flour * (this.state.waterPer/100);
        const waterX = water - 30;
        const waterY = 30;
        const salt = (flour+kovasz) * (this.state.saltPer/100);

        const fullWeight = flour + kovasz + salt + water;
        return (
                <div className="container bg-light rounded shadow-sm p-2 mt-3">  
                <h2>Kovászos tészta kalkulátor</h2>
            <div className="row mt-3">
                <div className="col col-4">Liszt mennyisége</div>
                <div className="col col-6">
                     <input type="text" className="form-control" id="flour" maxLength="4" value={flour} onChange={this.handleFlourChange}></input>
                </div>
                <div className="col col-1">gramm</div>
            </div>
            <div className="row mt-3">
                <div className="col col-4">Kovász mennyisége</div>
                <div className="col col-2 ">{kovasz.toString()}</div>
                <div className="col col-2">gramm</div>
                <div className="col col-2"><input type="text" className="form-control" id="hidro" maxLength="2" value={kovaszPer} onChange={this.handleKovaszPerChange} ></input></div>
                <div className="col col-1">%</div>
            </div>
            <div className="row mt-3">
                <div className="col col-4">Víz mennyisége</div>
                <div className="col col-2 ">{water.toString()}</div>
                <div className="col col-2">ml</div>
                <div className="col col-2"><input type="text" className="form-control" id="hidro" maxLength="2" value={waterPer} onChange={this.handleWaterPerChange} ></input></div>
                <div className="col col-1">%</div>
            </div>
            <div className="row mt-3">
                <div className="col col-4">Só mennyisége</div>
                <div className="col col-2 ">{salt.toString()}</div>
                <div className="col col-2">gramm</div>
                <div className="col col-2"><input type="text" className="form-control" id="hidro" maxLength="2" value={saltPer} onChange={this.handleSaltPerChange} ></input></div>
                <div className="col col-1">%</div>
            </div>
            <div className="row mt-3">
                <div className="col col-4">Teljes tömeg</div>
                <div className="col col-4 ">{fullWeight.toString()}</div>
                <div className="col col-4">gramm</div>
            </div>
            <div className="row mt-4">
          <div className="col col-12"> <span className="fs-3">Elkészítés</span></div>
          <div className="col col-12"> 
            <ol className="list-group list-group-numbered">
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Autólízis</div>
                  <strong>{flour.toString()}</strong>  gramm liszt összekeverése <strong>{waterX.toString()}</strong> ml vízzel, dagasztás maximum 2-3 percig! 
                  Majd az egész pihentetése 30-90 percig!
                </div>
                <span className="badge bg-primary rounded-pill">0,5-1,5 óra</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Dagasztás</div>
                  <strong>{kovasz.toString()}</strong>  gramm kovász hozzáadása a tésztához, 2-3 percig dagasztás, majd <strong>{salt.toString()}</strong>  gramm só és <strong>{waterY.toString()}</strong>  ml vízet hozzáadunk és további dagasztás még kb.12 percig!
                </div>
                <span className="badge bg-primary rounded-pill">15 perc</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Nyújtás</div>
                  A kész tésztát kivesszük a dagasztóból és nyújtjuk majd formázzuk!
                </div>
                <span className="badge bg-primary rounded-pill">10 - 15 perc</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Pihentetés</div>
                  A dagasztó tálat kikenjük olivaolajjal (nem kell sok) és hagyjuk pihenni a tésztát 40 percig.
                </div>
                <span className="badge bg-primary rounded-pill">40 - 60 perc</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Nyújtás</div>
                  Kivesszük a tésztát és óvatosan hogy a levegő ne szökjön ki az újbegyeinkkel kinyújtjuk majd hajtogatjuk és formázzuk.
                </div>
                <span className="badge bg-primary rounded-pill">10-15 perc</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Pihentetés</div>
                  A dagasztótálba visszarakjuk a tésztát és pihentetjük!
                </div>
                <span className="badge bg-primary rounded-pill">40 - 60 perc</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Nyújtás</div>
                  Kivesszük a tésztát és óvatosan hogy a levegő ne szökjön ki az újbegyeinkkel kinyújtjuk majd hajtogatjuk és formázzuk.
                </div>
                <span className="badge bg-primary rounded-pill">10-15 perc</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Pihentetés</div>
                  A dagasztótálba visszarakjuk a tésztát és pihentetjük!
                </div>
                <span className="badge bg-primary rounded-pill">40 - 60 perc</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Nyújtás</div>
                  Kivesszük a tésztát és óvatosan hogy a levegő ne szökjön ki az újbegyeinkkel kinyújtjuk majd hajtogatjuk és formázzuk.
                </div>
                <span className="badge bg-primary rounded-pill">10-15 perc</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Pihentetés</div>
                  A dagasztótálba visszarakjuk a tésztát és pihentetjük!
                </div>
                <span className="badge bg-primary rounded-pill">20 perc</span>
              </li>
            </ol>
          </div>
        </div>
            
        </div>
        );
    }
}



// Run the React application 
ReactDOM.render(<Container />, document.getElementById("root"));