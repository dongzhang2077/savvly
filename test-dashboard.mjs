// Test script to verify dashboard page compiles correctly

async function testDashboard() {
  try {
    const response = await fetch('http://localhost:3000/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/html',
      },
      redirect: 'manual' // Don't follow redirects
    })

    console.log('Dashboard page status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))

    if (response.status === 307 || response.status === 302) {
      console.log('✓ Redirected (expected - not logged in)')
      console.log('Redirect location:', response.headers.get('location'))
    } else if (response.status === 200) {
      console.log('✓ Page loaded successfully')
    } else {
      console.log('✗ Unexpected status:', response.status)
    }

  } catch (error) {
    console.error('Error testing dashboard:', error)
  }
}

testDashboard()
