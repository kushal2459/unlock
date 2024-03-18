import React from "react";
import { useState } from "react";
import logo from "../img/unlock_logo.svg";
import Card from "../Components/Card";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [serverName, setServerName] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [data, setData] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const img =
    "https://s3-alpha-sig.figma.com/img/dfde/e9e9/2c6ebceea750ebd7b4af5619aea0286b?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Danc5tEbQXrGmrhIA~GgUjLecdpkxxTdDdsfMM03O32QD2fBne1DHDckkJoa0eYbY0rVt1UpneP6hw-ZIcyN7~Uz4er-~6zncaHAmy1s2XLENSdJdhLSEM8w4qh~vgawWyTeNSbThPEWbq9wUZ839YFVBCyys9aCinaRWM56DBA98PnSRH~Qk6NrAh85tOAQRD8IThmhSnAl5fyeBOA~G01EE1wFsVBeTuWWonb5EjQ7AMiUENtCw3g6pUUwYQrO1COpdrjPAoZa9kzagD9HhMxy8RRRoB4Eer7nJcRVXPVPvFDZp6Lrt1j1nqWmvJZFPzzTbVP0IL4vdb8Pm4IPPw__";

    const api = 'https://photo.unlockjh.app/net/photo/search';

    function encodedCredentials(username, password){
      const credentials = `${username}:${password}`;
      return btoa(credentials);
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    try {
      const response = await fetch(
        api,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${encodedCredentials}`
          },
          body: JSON.stringify({ mobile, serverName }),
        }
      );

      if (response.status === 200) {
        const responseData = await response.json();
        setData(responseData);
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setAuthorized(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen max-w-md ">
        <div className="flex items-center bg-black h-[60px] w-full">
          <img src={logo} alt="logo" width={130} className="mx-auto " />
        </div>
        <form className="w-full px-10" onSubmit={handleSubmit}>
          <div className="mb-3 mt-8">
            <input
              type="text"
              placeholder="username"
              className="block w-full border border-black px-6 text-lg py-2 rounded-3xl placeholder-black mb-5"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="block w-full border border-black px-6 text-lg py-2 rounded-3xl placeholder-black"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <hr className="border border-black" />
          <div className="mt-3">
            <input
              type="text"
              placeholder="핸드폰 번호"
              className="block w-full border border-black px-6 text-lg py-2 rounded-3xl placeholder-black mb-5"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <input
              type="text"
              placeholder="서버 이름"
              className="block w-full border border-black px-6 text-lg py-2 rounded-3xl placeholder-black"
              required
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
            />
          </div>
          <div className="flex float-right text-xs my-2 text-black px-2">
            <p>* landers, ulsan, jeonbuk</p>
          </div>
          <button
            type="submit"
            className=" bg-black text-white w-full rounded-3xl h-[40px] mb-3"
          >
            조회
          </button>
          <hr className="border border-black" />
        </form>

        {formSubmitted && (
          <div>
            {authorized && data ? (
              <div className="my-5">
                <Card
                  printedAt={"2024-03-01 01:51:51"}
                  imageUrl={img}
                  cardId={1}
                />
                <Card
                  printedAt={"2024-03-01 01:51:51"}
                  imageUrl={img}
                  cardId={1}
                />
                <Card
                  printedAt={"2024-03-01 01:51:51"}
                  imageUrl={img}
                  cardId={1}
                />
                <button
                  type="button"
                  className=" bg-black text-white w-full rounded-3xl h-[40px] my-3"
                  onClick={(e) => setFormSubmitted(false)}
                >
                  서버 요청
                </button>
              </div>
            ) : authorized === false ? (
              <p className="my-10">조회 결과가 없습니다.</p>
            ) : (
              <p className="my-5">Loading...</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
