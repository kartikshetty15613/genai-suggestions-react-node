
import { Route, Routes, useNavigate } from 'react-router-dom';
import Category from './Component/Category';
import Feedback from './Component/Feedback';
import Graphs from './Component/Graphs';
import { useState } from 'react';


// const defaultCheckedItems = [];



function App() {
  
  const[CheckedItems,setCheckedItems] = useState([])
  

  const recieveCheckedItems = (data) => {
    setCheckedItems(data)
  }

  //console.log(CheckedItems)

  return (
    <div className="App">
        
         <Routes>
              <Route path='/' element={<Category recieveCheckedItems={recieveCheckedItems}/>}/>
              <Route path='/feedback' element={<Feedback CheckedItems={CheckedItems}/>}/>
              <Route path='/graph' element={<Graphs/>}/>
         </Routes>
      
    </div>
  );
}

export default App;































// const categories = [
//   {
//     name: "Customer Service",
//     subcategories: [
//       "Customer Satisfaction (CSAT)",
//       "Net Promoter Score (NPS)",
//       "Revenue Generation",
//       "Future Pipeline (Revenue Generation)",
//       "Churn Rate"
//     ]
//   },
//   {
//     name: "Finance & Accountability",
//     subcategories: [
//       "Revenue & Profitability",
//       "Cash Flow",
//       "Liquidity & Solvency",
//       "Efficiency Ratio",
//       "Investment & Growth",
//       "Cost Management",
//       "Market Position & Competitiveness",
//       "Risk Management",
//       "Strategic Planning",
//       "Stakeholder Insights"
//     ]
//   },
//   {
//     name: "Sustainability & CSR",
//     subcategories: [
//       "Carbon Footprint",
//       "Energy Consumption",
//       "Green IT",
//       "Waste Management",
//       "Sustainable Procurement",
//       "CSR",
//       "Community Impact"
//     ]
//   },
//   {
//     name: "Sales & Marketing",
//     subcategories: [
//       "Lead Conversation Rate",
//       "Customer Acquisition Cost",
//       "Customer Lifetime Value",
//       "Sales Cycle Length",
//       "Marketing ROI",
//       "Customer Engagement Rate",
//       "Social Media Metrics",
//       "Campaign Marketing"
//     ]
//   },
//   {
//     name: "Innovation & Product Development",
//     subcategories: [
//       "R&D Efficiency",
//       "Time to Market",
//       "Innovation Ratio",
//       "Customer Feedback",
//       "Feature Adoption Rate",
//       "Development Cost",
//       "Collaboration Efficiency",
//       "Patent Application & Approvals"
//     ]
//   },
//   {
//     name: "Marketing & Branding",
//     subcategories: [
//       "Brand Awareness",
//       "Customer Engagement",
//       "Lead Generation",
//       "Customer Acquisition Cost",
//       "Return on Marketing Investment (ROMI)"
//     ]
//   },
//   {
//     name: "Human Resources",
//     subcategories: [
//       "Time to Hire",
//       "Cost per Hire",
//       "Quality of Hire",
//       "Employee Retention Rate",
//       "Employee Engagement",
//       "Training & Development Effectiveness",
//       "Employee Productivity",
//       "Absenteeism Rate",
//       "Employee Satisfaction (ESAT)",
//       "Diversity and Inclusion Metrics",
//       "Performance Management",
//       "Internal Mobility Rate",
//       "Compliance and Risk Management",
//       "Employee Net Promoter Score (eNPS)",
//       "Onboarding Effectiveness"
//     ]
//   },
//   {
//     name: "IT & Cyber Security",
//     subcategories: [
//       "Threat Detection Rate",
//       "Incident Response Time",
//       "Vulnerability Management",
//       "Security Incident Frequency",
//       "User Behavior Analytics",
//       "Compliance and Audit Readiness",
//       "System Uptime and Availability"
//     ]
//   },
//   {
//     name: "Supply Chain & Logistic",
//     subcategories: [
//       "Inventory Management",
//       "Demand Forecasting & Accuracy",
//       "Order Fulfilment",
//       "Supply Chain Cost",
//       "Supplier Performance",
//       "Warehouse Operations",
//       "Logistics Efficiency",
//       "Risk Management",
//       "Technology Utilization"
//     ]
//   },
//   {
//     name: "Operations Management",
//     subcategories: [
//       "Operations Management Efficiency",
//       "Cost Efficiency",
//       "Resource Utilization",
//       "Workplace Safety Metrics",
//       "Productivity & Accuracy",
//       "Enterprise Service Efficiency",
//       "Facility & System Performance",
//       "IT System Performance"
//     ]
//   },
//   {
//     name: "Legal Operations",
//     subcategories: [
//       "Contract Management",
//       "Legal Research Efficiency",
//       "Documentation Automation",
//       "Case Management",
//       "IP Governance"
//     ]
//   }
// ];

