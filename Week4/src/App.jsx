import { useState, useEffect } from "react";
export default function App() {
  const [data, setData] = useState(null);
  var url = "https://jsonplaceholder.typicode.com/users";
  useEffect(() => {
    let isFirstUser = "true";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const updatedUsers = data.map((user) => {
          const status = isFirstUser == "true" ? "true" : "false";
          isFirstUser = "false";
          return { ...user, status };
        });

        setData(updatedUsers);
      })
      .catch((error) => console.error("Error:", error));
  }, [url]);
  console.log(data);
  const prev = (i) => {
    setData((prevData) => {
      return prevData.map((item) => {
        return {
          ...item,
          status: "false",
        };
      });
    });
    setData((prevData) => {
      return prevData.map((item, index) => {
        return index === i - 1
          ? {
              ...item,
              status: "true",
            }
          : item;
      });
    });
  };
  const next = (i) => {
    setData((prevData) => {
      return prevData.map((item) => {
        return {
          ...item,
          status: "false",
        };
      });
    });
    setData((prevData) => {
      return prevData.map((item, index) => {
        console.log(i);
        return index === i + 1
          ? {
              ...item,
              status: "true",
            }
          : item;
      });
    });
  };
  return (
    <div>
      {data ? (
        <div className="ml-[50vw] translate-x-[-50%]  w-[50vw]">
          {data.map((item, i) => (
            <div
              key={i}
              className={
                "p-[50px] bg-slate-200 w-[800px] h-[400px]  my-6 " + item.status
              }
            >
              <div>
                <p className="font-bold text-2xl">{item.id}</p>
                <h1 className="text-[30px] font-bold">{item.name}</h1>
                <div className="flex items-center justify-between">
                  <p>username:{item.username}</p>
                  <p>email:{item.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div>
                    <p className="text-2xl font-bold">Address:</p>
                    <div>
                      <div>Street: {item.address.street}</div>
                      <div>Suite: {item.address.suite}</div>
                      <div>City: {item.address.city}</div>
                      <div>Zipcode: {item.address.zipcode}</div>
                      <div className="flex items-center">
                        <p className="mr-4"> Geo:</p>
                        <div>
                          <div>Lat: {item.address.geo.lat}</div>
                          <div>Lng: {item.address.geo.lng}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-bold">Phone: {item.phone}</p>
                    <p className="text-xl font-bold">Website: {item.website}</p>
                    <div className="flex items-center">
                      <p className="text-xl font-bold mr-4">Company:</p>
                      <div>
                        <p className=" ">Name: {item.company.name}</p>
                        <p className="">
                          CatchPhrase: {item.company.catchPhrase}
                        </p>
                        <p className="">Bs: {item.company.bs}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="btn btn-outline btn-primary"
                  onClick={() => prev(i)}
                >
                  prev
                </button>
                <button
                  className=" btn btn-outline btn-primary"
                  onClick={() => next(i)}
                >
                  next
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
