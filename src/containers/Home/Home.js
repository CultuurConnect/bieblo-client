import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import moment from 'moment';
import { LoginForm } from '../../components';

@connect(
    state => ({
      user: state.auth.user,
      regions: state.regions.data,
    })
)
export default class Home extends Component {
  static propTypes = {
    user: PropTypes.object,
    regions: PropTypes.array
  };
  render() {
    const {regions} = this.props;
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const user = this.props.user;
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        { user && (
          <div>
            <div className="content-heading">
              Dashboard
              <small>Welcome to Bieblo!</small>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="panel widget bg-primary">
                  <div className="row-table row">
                    <div className="text-center bg-primary-dark pv-lg col-xs-4">
                      <em className="fa fa-map-marker fa-3x"/>
                    </div>
                    <div className="pv-lg col-xs-8"><div className="h2 mt0">{regions.length}</div>
                      <div className="text-uppercase">Libraries</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="panel widget bg-purple">
                  <div className="row-table row">
                    <div className="text-center bg-purple-dark pv-lg col-xs-4">
                      <em className="fa fa-hashtag fa-3x"/>
                    </div>
                    <div className="pv-lg col-xs-8"><div className="h2 mt0">0</div>
                      <div className="text-uppercase">Tags</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="panel widget bg-green">
                  <div className="row-table row">
                    <div className="text-center bg-green-dark pv-lg col-xs-4">
                      <em className="fa fa-book fa-3x"/>
                    </div>
                    <div className="pv-lg col-xs-8"><div className="h2 mt0">0</div>
                      <div className="text-uppercase">Books</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="panel widget">
                  <div className="row-table row">
                    <div className="text-center bg-green pv-lg col-xs-4">
                      <div className="text-sm inline-block">{moment().format('MMMM')}</div><br/>
                      <div className="h2 mt0 inline-block">{moment().format('DD')}</div>
                    </div>
                    <div className="pv-lg col-xs-8">
                      <div className="text-uppercase inline-block">{moment().format('dddd')}</div><br/>
                      <div className="h2 mt0 inline-block">{moment().format('HH:mm')}</div>
                      <div className="text-muted text-sm inline-block">{moment().format('a')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-12">
                    <div id="panelChart9" className="panel panel-default">
                      <div className="panel-heading">
                        <a href="#" title="Refresh Panel" className="pull-right">
                          <em className="fa fa-refresh"/>
                        </a>
                        <div className="panel-title">API scrape activiteit</div>
                      </div>
                      <div className="panel-body">
                        <p>hier komen scraping statistieken</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <div className="panel-title">Laatste gebeurtenissen</div>
                  </div>
                  <div className="list-group">
                    <div className="list-group-item">
                      <div className="media-box">
                        <div className="pull-left">
                          <span className="fa-stack">
                            <em className="fa fa-circle fa-stack-2x text-purple"/>
                            <em className="fa fa-hashtag fa-stack-1x fa-inverse text-white"/>
                          </span>
                        </div>
                        <div className="media-box-body clearfix">
                          <small className="text-muted pull-right ml">15m</small>
                          <div className="media-box-heading">
                            <a href="#" className="text-purple m0">NIEUWE TAG</a>
                          </div>
                          <p className="m0">
                            <small>
                              <a href="#"># voetbal</a>
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="media-box">
                        <div className="pull-left">
                          <span className="fa-stack">
                            <em className="fa fa-circle fa-stack-2x text-info"/>
                            <em className="fa fa-map-marker fa-stack-1x fa-inverse text-white"/>
                          </span>
                        </div>
                        <div className="media-box-body clearfix">
                          <small className="text-muted pull-right ml">2h</small>
                          <div className="media-box-heading">
                            <a href="#" className="text-info m0">NIEUWE BIBLIOTHEEK</a>
                          </div>
                          <p className="m0">
                            <small>
                              <a href="#">Gent Dampoort</a>
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="media-box">
                        <div className="pull-left">
                          <span className="fa-stack">
                            <em className="fa fa-circle fa-stack-2x text-danger"/>
                            <em className="fa fa-exclamation fa-stack-1x fa-inverse text-white"/>
                          </span>
                        </div>
                        <div className="media-box-body clearfix">
                          <small className="text-muted pull-right ml">5h</small>
                          <div className="media-box-heading">
                            <a href="#" className="text-danger m0">Fout</a>
                          </div><p className="m0">
                          <a href="#">Fout opgetreden</a>
                        </p>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="media-box">
                        <div className="pull-left">
                          <span className="fa-stack">
                            <em className="fa fa-circle fa-stack-2x text-success"/>
                            <em className="fa fa-book fa-stack-1x fa-inverse text-white"/>
                          </span></div>
                        <div className="media-box-body clearfix">
                          <small className="text-muted pull-right ml">15h</small>
                          <div className="media-box-heading">
                            <a href="#" className="text-success m0">NIEUW BOEK</a>
                          </div>
                          <p className="m0">
                            <a href="#">De boze wolf</a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="media-box">
                        <div className="pull-left">
                          <span className="fa-stack">
                            <em className="fa fa-circle fa-stack-2x text-warning"/>
                            <em className="fa fa-tasks fa-stack-1x fa-inverse text-white"/>
                          </span>
                        </div>
                        <div className="media-box-body clearfix">
                          <small className="text-muted pull-right ml">1w</small>
                          <div className="media-box-heading">
                            <a href="#" className="text-warning m0">TASKS COMPLETION</a>
                          </div>
                          <div className="progress progress-xs m0">

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-footer clearfix">
                    <a href="#" className="pull-left">
                      <small>Load more</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        { !user && <LoginForm />}
      </div>
    );
  }
}
