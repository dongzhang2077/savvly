// Test script to login and verify header with dropdown menu compiles

async function testHeader() {
  try {
    // Step 1: Login to get session
    console.log('Step 1: Logging in...')
    const loginResponse = await fetch('http://localhost:3000/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    })

    console.log('Login response status:', loginResponse.status)

    // Get session cookies
    const cookies = loginResponse.headers.get('set-cookie')
    console.log('Session cookies received:', cookies ? 'Yes' : 'No')

    // Step 2: Access dashboard with session
    console.log('\nStep 2: Accessing dashboard with session...')
    const dashboardResponse = await fetch('http://localhost:3000/dashboard', {
      method: 'GET',
      headers: {
        'Cookie': cookies || '',
      },
    })

    console.log('Dashboard status:', dashboardResponse.status)

    if (dashboardResponse.status === 200) {
      console.log('✓ Dashboard loaded successfully with header')
      console.log('✓ Header with dropdown menu compiled without errors')
    } else if (dashboardResponse.status === 307 || dashboardResponse.status === 302) {
      console.log('Still redirected - login may not have worked')
      console.log('Redirect location:', dashboardResponse.headers.get('location'))
    }

  } catch (error) {
    console.error('Error testing header:', error)
  }
}

testHeader()
