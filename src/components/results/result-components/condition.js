import React from "react";
import 'intl';
import 'intl/locale-data/jsonp/en';
import FederatedResult from '../result';

// Custom class for the result component
class FederatedConditionResult extends FederatedResult {
  
  render() {
    const { doc, highlight } = this.props;

    return (
      <li className="search-card search-card--condition" onClick={() => this.props.onSelect(doc)}>
        {doc.ss_federated_image &&
          <div className="img">
            <img src={doc.ss_federated_image} />
          </div>
        }
        
        <div className="text">
          {doc.sm_department &&
            <div className="tags">
              <p>
                {Array.isArray(doc.sm_department) ? doc.sm_department.map(dep => (
                  <span className="tag tag--department">{dep}</span>
                )) : 
                  <span className="tag tag--department">BMC</span>
                }
              </p>
            </div>
          }

          <h3 className="heading">
            <a href={this.getCanonicalLink(doc)} dangerouslySetInnerHTML={{__html: doc.ss_federated_title}} />
          </h3>

          <p className="summary" dangerouslySetInnerHTML={{__html: doc.ss_summary}} />

          <div className="meta">
            <cite className="citation">{this.renderSitenameLinks(doc.sm_site_name, doc.sm_urls, doc.ss_site_name)}</cite>
            <span className="type">{doc.sm_federated_type}</span>
          </div>
        </div>
      </li>
    )
  }
}

export default FederatedConditionResult;
