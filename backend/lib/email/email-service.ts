import { Resend } from 'resend';
import * as React from 'react';
import { render } from '@react-email/render';
import { ApplicationSubmittedEmailTemplate } from '@/components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendApplicationSubmittedEmailParams {
  to: string;
  firstName: string;
  applicationNumber: string;
  loanType: string;
  loanAmount: string;
}

export async function sendApplicationSubmittedEmail({
  to,
  firstName,
  applicationNumber,
  loanType,
  loanAmount,
}: SendApplicationSubmittedEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    // Format loan type for display
    const formattedLoanType = loanType
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Format loan amount with GHS currency
    const formattedLoanAmount = `GHS ${parseFloat(loanAmount).toLocaleString('en-GH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

    // Render React component to HTML (render returns a Promise)
    const emailHtml = await render(
      React.createElement(ApplicationSubmittedEmailTemplate, {
        firstName,
        applicationNumber,
        loanType: formattedLoanType,
        loanAmount: formattedLoanAmount,
      })
    );

    const { data, error } = await resend.emails.send({
      from: 'Innovative Finance <noreply@notifications.innovative-finance.com>',
      to: [to],
      subject: 'Thank you for applying',
      html: emailHtml,
    });

    if (error) {
      console.error('Resend email error:', error);
      return { success: false, error: error.message || 'Failed to send email' };
    }

    console.log('Application submitted email sent successfully:', data);
    return { success: true };
  } catch (error) {
    console.error('Error sending application submitted email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

