const GEMINI_API_KEY = "AIzaSyDlLiOgzIZqToAUBC-XC5DRzhWdwjWB1xk";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

interface GeneratedIdentity {
  name: string;
  address: string;
  phone: string;
  email: string;
  birthday: string;
  age: string;
  ssn: string;
  mothersMaidenName: string;
  geoCoordinates: string;
  zodiac: string;
  username: string;
  password: string;
  website: string;
  creditCard: string;
  creditCardExpires: string;
  creditCardCvc: string;
  company: string;
  occupation: string;
  height: string;
  weight: string;
  bloodType: string;
  favoriteColor: string;
  vehicle: string;
  trackingNumber: string;
  guid: string;
}

export async function generateFakeIdentity(
  gender: "male" | "female" | "random",
  nameSet: string,
  country: string
): Promise<GeneratedIdentity> {
  const prompt = `Generate a completely fake identity for testing purposes with the following specifications:
- Gender: ${gender}
- Name origin/set: ${nameSet}
- Country: ${country}

Please provide a realistic fake identity with ALL of the following details in a structured format:

1. Full name (first, middle initial, last)
2. Complete address (street, city, state/province, postal code)
3. Phone number (formatted for the country)
4. Email address
5. Birthday (month day, year format)
6. Age in years
7. Social Security Number or equivalent (with XXXs for privacy, like 123-45-XXXX)
8. Mother's maiden name
9. Geographic coordinates (latitude, longitude)
10. Zodiac sign
11. Username (creative online handle)
12. Password (secure but fake)
13. Website domain
14. Credit card number (fake, use standard format like 5555 1234 5678 9012)
15. Credit card expiration (MM/YYYY format)
16. Credit card CVC (3 digits)
17. Company name
18. Occupation/job title
19. Height (feet and inches with centimeters)
20. Weight (pounds with kilograms)
21. Blood type
22. Favorite color
23. Vehicle (year make model)
24. UPS tracking number (fake but realistic format)
25. GUID (standard UUID format)

Please format your response as a JSON object with these exact keys:
{
  "name": "",
  "address": "",
  "phone": "",
  "email": "",
  "birthday": "",
  "age": "",
  "ssn": "",
  "mothersMaidenName": "",
  "geoCoordinates": "",
  "zodiac": "",
  "username": "",
  "password": "",
  "website": "",
  "creditCard": "",
  "creditCardExpires": "",
  "creditCardCvc": "",
  "company": "",
  "occupation": "",
  "height": "",
  "weight": "",
  "bloodType": "",
  "favoriteColor": "",
  "vehicle": "",
  "trackingNumber": "",
  "guid": ""
}

Make sure all data is completely fictional and appropriate for the specified gender, name origin, and country. Ensure the data is internally consistent (e.g., address matches country, phone format matches country, etc.).`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error("No generated content received");
    }

    // Extract JSON from the response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    const identity = JSON.parse(jsonMatch[0]);
    return identity;
  } catch (error) {
    console.error("Error generating fake identity:", error);
    throw new Error("Failed to generate identity");
  }
}