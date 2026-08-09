export async function onRequestGet(context) {
  return new Response(JSON.stringify({ 
    status: 'ok', 
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString()
  }), {
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    
    // Validate required fields
    const { name, email, subject, message } = data;
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ 
        error: 'All fields are required' 
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Log contact submission
    const contactEntry = {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      ip: context.request.headers.get('CF-Connecting-IP') || 'unknown'
    };

    console.log('New contact submission:', JSON.stringify(contactEntry, null, 2));

    // Here you would typically:
    // 1. Send email via Resend, SendGrid, or similar
    // 2. Store in a database
    // 3. Send to a webhook

    // For now, we'll just log it and return success
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Thank you for your message! I\'ll get back to you soon.',
      data: contactEntry
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process your message. Please try again.' 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}
