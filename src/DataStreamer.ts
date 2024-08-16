export interface Order {
  price: number,
  size: number,
}

export interface ServerRespond {
  stock: string,
  top_bid: Order,
  top_ask: Order,
  timestamp: Date,
}

class DataStreamer {
  // The URL where the data feed server is listening
  static API_URL: string = 'http://localhost:8080/query?id=1';

  /**
   * Send request to the data feed server and executes callback function on success
   * @param callback callback function that takes JSON object as its argument
   */
  static getData(callback: (data: ServerRespond[]) => void): void {
    const request = new XMLHttpRequest();
    request.open('GET', DataStreamer.API_URL, true); // Change to asynchronous

    request.onload = () => {
      if (request.status === 200) {
        callback(JSON.parse(request.responseText));
      } else {
        console.error('Request failed with status:', request.status);
      }
    };

    request.onerror = () => {
      console.error('Request error');
    };

    request.send();
  }
}

export default DataStreamer;
