import React from 'react'

export default class DatePicker extends React.Component{

  render(){
    return(
      <div className="bootstrap-iso">
        <div className="container-fluid">
          <div className="row">
          {/* <div className="col-md-6 col-sm-6 col-xs-12"> */}
            <form action="https://formden.com/post/MlKtmY4x/" className="form-horizontal" method="post">
            <div className="form-group ">
              {/* <label className="control-label col-sm-2 requiredField" htmlFor="date">
              Date
              <span className="asteriskField">
                *
              </span>
              </label> */}
              <div className="col-sm-10">
              <div className="input-group">
                <div className="input-group-addon">
                <i className="fa fa-calendar">
                </i>
                Date Applied
                </div>
                <input className="form-control" id="date" name="date" placeholder="MM/DD/YYYY" type="text"/>
              </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-10 col-sm-offset-2">
              {/* <input name="_honey" style="display:none" type="text"/> */}
              {/* <input  style="display:none" type="text"/> */}
              <button className="btn btn-primary " name="submit" type="submit">
                Submit
              </button>
              </div>
            </div>
            </form>
          </div>
          {/* </div> */}
        </div>
      </div>
    )
  }
}