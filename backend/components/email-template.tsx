import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  applicationNumber: string;
  loanType: string;
  loanAmount: string;
}

export function ApplicationSubmittedEmailTemplate({ 
  firstName, 
  applicationNumber,
  loanType,
  loanAmount 
}: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ backgroundColor: '#6B21A8', color: '#FFFFFF', padding: '20px', textAlign: 'center', borderRadius: '8px 8px 0 0' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Thank You for Applying</h1>
      </div>
      
      <div style={{ backgroundColor: '#F9FAFB', padding: '30px', borderRadius: '0 0 8px 8px' }}>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#1F2937', marginBottom: '20px' }}>
          Dear {firstName},
        </p>
        
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#1F2937', marginBottom: '20px' }}>
          Thank you for submitting your loan application with Innovative Finance. We have successfully received your application and it is now under review.
        </p>
        
        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: '18px', color: '#6B21A8', marginTop: 0, marginBottom: '15px' }}>Application Details</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tr>
              <td style={{ padding: '8px 0', color: '#6B7280', fontSize: '14px', fontWeight: 'bold' }}>Application Number:</td>
              <td style={{ padding: '8px 0', color: '#1F2937', fontSize: '14px' }}>{applicationNumber}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', color: '#6B7280', fontSize: '14px', fontWeight: 'bold' }}>Loan Type:</td>
              <td style={{ padding: '8px 0', color: '#1F2937', fontSize: '14px' }}>{loanType}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', color: '#6B7280', fontSize: '14px', fontWeight: 'bold' }}>Loan Amount:</td>
              <td style={{ padding: '8px 0', color: '#1F2937', fontSize: '14px' }}>{loanAmount}</td>
            </tr>
          </table>
        </div>
        
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#1F2937', marginBottom: '20px' }}>
          Our team will review your application and get back to you within 3-5 business days. You will receive updates via email or phone call.
        </p>
        
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#1F2937', marginBottom: '20px' }}>
          If you have any questions or need to provide additional information, please don't hesitate to contact us.
        </p>
        
        <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #E5E7EB' }}>
          <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
            Best regards,<br />
            <strong style={{ color: '#6B21A8' }}>Innovative Finance Team</strong>
          </p>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '20px', padding: '20px', color: '#6B7280', fontSize: '12px' }}>
        <p style={{ margin: 0 }}>
          This is an automated email. Please do not reply to this message.
        </p>
      </div>
    </div>
  );
}

