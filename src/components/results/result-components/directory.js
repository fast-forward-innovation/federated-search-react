import React from "react";
import 'intl';
import 'intl/locale-data/jsonp/en';
import FederatedResult from '../result';

// Custom class for the result component
class FederatedDirectoryResult extends FederatedResult {
  render() {
    const { doc, highlight } = this.props;

    return (
      <li className="search-card search-card--directory" onClick={() => this.props.onSelect(doc)}>
        {doc.ss_federated_image &&
          <div className="img">
            <img src={doc.ss_federated_image} />
          </div>
        }
        
        <div className="text">
          {doc.sm_department &&
            <div className="tags tags--comma department">
              <p>
                {Array.isArray(doc.sm_department) ? doc.sm_department.map(dep => (
                  <span className="tag">{dep}</span>
                )) : 
                  <span className="tag">BMC</span>
                }
              </p>
            </div>
          }

          <h3 className="heading">
            <a href={this.getCanonicalLink(doc)} dangerouslySetInnerHTML={{__html: doc.ss_federated_title}} />
          </h3>

          <p className="summary" dangerouslySetInnerHTML={{__html: doc.ss_summary}} />

          <div className="meta tags tags--pipe">
            <cite className="tags tags--list citation">{this.renderSitenameLinks(doc.sm_site_name, doc.sm_urls, doc.ss_site_name)}</cite>
            <span className="tag type">{doc.sm_federated_type}</span>
          </div>
        </div>
      </li>
    )
  }
}

export default FederatedDirectoryResult;
