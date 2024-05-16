class Hash {
  constructor() {
    this.capacity = 16;
    this.load_factor = 0.75;
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.capacity;
  }
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (bucket.key === key) {
      bucket.value = value;
    }
    bucket.push({ key, value });
    this.size++;

    if (this.size / this.capacity > this.load_factor) {
      console.log('yes');
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < this.buckets.length; i++) {
      if (bucket[i].key === key) {
        return bucket[i].value;
      }
    }
    return null;
  }
  has(key) {
    const index = this.hash(key);
    try {
      const bucket = this.buckets[index];
      for (let i = 0; i < this.buckets.length; i++) {
        if (bucket[i].key === key) {
          return true;
        }
      }
    } catch (err) {
      return false;
    }
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < this.buckets.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }
  clear() {
    this.buckets.forEach((bucket) => {
      bucket.splice(0, bucket.length);
    });
    this.size = 0;
  }

  keys() {
    const keysArray = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((entry) => {
        keysArray.push(entry.key);
      });
    });
    return keysArray;
  }
  values() {
    const valuesArray = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((entry) => {
        valuesArray.push(entry.value);
      });
    });
    return valuesArray;
  }
  entries() {
    const entriesArr = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((entry) => {
        entriesArr.push(entry);
      });
    });
    return entriesArr;
  }
}

class Node {
  constructor(value, hashCode) {
    this.value = value;
    this.hashCode = hashCode;
  }
}
