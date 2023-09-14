"use client";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";

const TripsClient: React.FC = () => {
  return (
    <Container>
      <Heading
        title="Hacker Input"
        subtitle="Please Fill Out Your Information"
      />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-3
          2xl:grid-cols-6
          gap-8
        "
      >
        {/* 1row */}
        <div>
          <div>
            <label htmlFor="nickname" className="block text-gray-700">
              Nick Name:
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              // value={nickname}
              // onChange={handleNicknameChange}
              className="w-full mt-2 p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="github" className="block text-gray-700">
              Github:
            </label>
            <input
              type="text"
              id="github"
              name="github"
              // value={nickname}
              // onChange={handleNicknameChange}
              className="w-full mt-2 p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="twitter" className="block text-gray-700">
              Twitter:
            </label>
            <input
              type="text"
              id="twitter"
              name="twitter"
              // value={nickname}
              // onChange={handleNicknameChange}
              className="w-full mt-2 p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="mbti" className="block text-gray-700">
              MBTI:
            </label>
            <input
              type="text"
              id="mbti"
              name="mbti"
              // value={nickname}
              // onChange={handleNicknameChange}
              className="w-full mt-2 p-2 border rounded-md"
            />
          </div>

          {/* Preference input */}
          <div>
            <label className="block text-gray-700">Preference:</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="preference"
                  value="party"
                  // checked={preference === "option1"}
                  // onChange={handlePreferenceChange}
                />
                <span className="ml-2">Party 😸</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="preference"
                  value="Sleep12"
                  // checked={preference === "option2"}
                  // onChange={handlePreferenceChange}
                />
                <span className="ml-2">Sleep before Midnight</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="preference"
                  value="calm"
                  // checked={preference === "option3"}
                  // onChange={handlePreferenceChange}
                />
                <span className="ml-2">Calm and Meditation</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TripsClient;
