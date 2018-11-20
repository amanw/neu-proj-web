import React from 'react';
import UniversityEditForm from './UniversityEditForm';
import { Redirect } from 'react-router-dom';
import * as actions from 'actions';
import { connect } from 'react-redux';

 class UniversityEdit extends React.Component {

  constructor() {
    super();

    this.universityEdit = this.universityEdit.bind(this);

  }
  componentWillMount() {
    
    const universityId = this.props.match.params.id;
    this.props.dispatch(actions.fetchUniversitiesById(universityId));
   
  }

  universityEdit(universityData) {
    const {university: {_id}, dispatch } = this.props;
    dispatch(actions.universityUpdate(_id,universityData));
  }

  render() {
    if (this.props.universities.redirectEdit) {
        return <Redirect to={{pathname:'/university'}}/>
      }

    return (
      <div id ="page-content-wrapper">
      <div className = "container-fluid">
      <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page"><i className="far fa-edit"/><span> Edit University Data </span></li>
      </ol>
      </nav>
      <section id='register'>
        <div className='bwm-form'>
          <div className='row'>
            <div className='col-md-5'>
            {/* <h1 className='page-title'>Create University Data</h1> */}
            <UniversityEditForm submitCb={this.universityEdit}
                                options={this.props.universities.universityAreas}
                                options1 ={this.props.universities.universityOwners}
                                options2 ={this.props.university}
                                errors={this.props.universities.errors}  />
              
            </div>
            <div className='col-md-6 ml-auto'>
              <div className='image-container'>
                <h2 className='catchphrase'>This is how you will create a new Unversity to Edit to the Audit Plan.</h2>
                <img src={process.env.PUBLIC_URL + '/img/register-image.jpg'} alt=""/>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    universities: state.universities,
    university: state.universityData.data
  }
}

export default connect(mapStateToProps)(UniversityEdit)



